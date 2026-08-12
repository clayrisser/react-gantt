.POSIX:
export ROOTDIR ?= $(eval ROOTDIR := $(shell git rev-parse --show-toplevel))$(ROOTDIR)
include $(ROOTDIR)/make.mk

.DEFAULT_GOAL := build

ASDF_VERSION ?= v0.20.0
.PHONY: prepare prepare/asdf prepare/cloc
prepare: sudo
	@command -v asdf >/dev/null 2>&1 || $(MAKE) prepare/asdf
	@command -v cloc >/dev/null 2>&1 || $(MAKE) prepare/cloc
	@awk '!/^#/ && NF {print $$1}' .tool-versions | \
		while read t; do asdf plugin add "$$t" 2>/dev/null || true; done
	@rcfile=$$(mktemp); \
		{ asdf install 2>&1; echo $$? >$$rcfile; } | grep --line-buffered -v 'is already installed' || true; \
		rc=$$(cat $$rcfile); rm -f $$rcfile; exit $$rc
	@$(PNPM) install
prepare/asdf:
	@command -v brew >/dev/null 2>&1 && brew install asdf || { \
		o=$$(uname | tr A-Z a-z); a=$$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/'); \
		curl -fsSL "https://github.com/asdf-vm/asdf/releases/download/$(ASDF_VERSION)/asdf-$(ASDF_VERSION)-$$o-$$a.tar.gz" \
			| $(SUDO) tar -xz -C /usr/local/bin asdf; \
	}
prepare/cloc:
	@$(PKG_INSTALL) cloc

.PHONY: configure
configure:
	@for cmd in asdf node $(PNPM) $(CLOC); do \
		command -v $$cmd >/dev/null 2>&1 || { echo "$$cmd is missing, run \`make prepare\`"; exit 1; }; \
	done

.PHONY: deps ~deps
~deps: node_modules/.modules.yaml
node_modules/.modules.yaml: pnpm-lock.yaml package.json
	@$(MAKE) deps
deps: configure FORCE
	@$(PNPM) install

.PHONY: build
build: ~deps
	@$(PNPM) build

.PHONY: build/demo
build/demo: ~deps
	@$(PNPM) build:demo

.PHONY: start
start: ~deps
	@$(PNPM) start

.PHONY: test test/unit
test: test/unit
test/unit: ~deps
	@$(PNPM) vitest run --coverage --coverage.reporter=text --coverage.reporter=lcov

.PHONY: format
format: ~deps
	@$(OXFMT) .

.PHONY: lint
lint: ~deps
	@$(OXLINT)
	@$(OXFMT) --check .
	@$(TSC) --noEmit

.PHONY: count
count: configure
	@$(CLOC) --vcs git

.PHONY: clean
clean:
	@rm -rf lib demo/dist coverage

.PHONY: purge
purge: clean
	@$(GIT) clean -fxd
