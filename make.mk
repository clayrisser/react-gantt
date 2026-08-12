MAKEFLAGS += --no-print-directory

# Recipes spawn fresh non-interactive shells that don't source ~/.zshrc, so
# the asdf shim dir isn't on PATH unless we add it here. asdf's default data
# dir is ~/.asdf on both Linux and macOS; honour ASDF_DATA_DIR if the user
# overrides it (XDG-style). Duplicates are harmless — shell PATH lookup just
# stops at the first match.
export PATH := $(or $(ASDF_DATA_DIR),$(HOME)/.asdf)/shims:$(PATH)

# Tool defaults — overridable via env.
GIT ?= git
CLOC ?= cloc
PNPM ?= pnpm
OXFMT ?= $(PNPM) oxfmt
OXLINT ?= $(PNPM) oxlint
TSC ?= $(PNPM) tsc

SUDO ?= $(eval SUDO := $(shell command -v sudo >/dev/null && echo sudo))$(SUDO)
PKG_INSTALL ?= $(eval PKG_INSTALL := $(or \
	$(shell command -v brew >/dev/null && echo 'brew install'), \
	$(shell command -v apt-get >/dev/null && echo '$(SUDO) apt-get update && $(SUDO) apt-get install -y'), \
	$(shell command -v dnf >/dev/null && echo '$(SUDO) dnf install -y'), \
	echo "no supported package manager" >&2;false))$(PKG_INSTALL)

.PHONY: sudo
sudo:
	@$(SUDO) true

.PHONY: FORCE
FORCE:
