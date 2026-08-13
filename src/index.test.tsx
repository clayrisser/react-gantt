import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import GanttPopup from './GanttPopup';
import ReactGantt, { GanttRow } from './index';
import type { GanttTemplates, ReactGanttProps } from './index';

const templates: GanttTemplates = {
  myTasks: {
    title: 'My Tasks',
    steps: [
      {
        name: 'Task Phase One',
        color: '#0099FF',
      },
      {
        name: 'Task Phase Two',
        color: '#FF9900',
      },
    ],
  },
};

function renderGantt(props: Partial<ReactGanttProps> = {}) {
  return render(
    <ReactGantt
      templates={templates}
      leftBound={new Date(2016, 5, 30)}
      rightBound={new Date(2016, 8, 29)}
      dateFormat="YYYY-MM-DD"
      {...props}
    >
      <GanttRow
        title="Task 1"
        description="First task"
        templateName="myTasks"
        steps={[new Date(2016, 6, 1), new Date(2016, 8, 4), new Date(2016, 8, 17)]}
      />
      <GanttRow
        title="Task 2"
        description="Second task"
        templateName="myTasks"
        steps={[new Date(2016, 2, 27), new Date(2016, 7, 9), new Date(2016, 7, 22)]}
      />
    </ReactGantt>,
  );
}

beforeAll(() => {
  // jsdom has no layout engine, so give every element a fixed width for the
  // timeline measurement to pick up.
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: () => 640,
  });
});

afterEach(cleanup);

describe('ReactGantt', () => {
  it('renders a row per child with its title', () => {
    const { container } = renderGantt();
    expect(screen.getByText('Task 1')).toBeTruthy();
    expect(screen.getByText('Task 2')).toBeTruthy();
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('measures the timeline and renders monthly ticks for a ~3 month span', () => {
    renderGantt();
    // 91 days at 640px escalates week ticks (13 > 640/60px) to month ticks.
    const labels = screen.getAllByText(/^16-\d{2}-\d{2}$/);
    expect(labels.map((label) => label.textContent)).toEqual(['16-06-30', '16-07-30', '16-08-29']);
  });

  it('renders minute ticks for a sub-3-minute span', () => {
    render(
      <ReactGantt
        templates={templates}
        leftBound={new Date(2016, 5, 30, 0, 0, 0)}
        rightBound={new Date(2016, 5, 30, 0, 1, 30)}
      >
        <GanttRow
          title="Short task"
          templateName="myTasks"
          steps={[
            new Date(2016, 5, 30, 0, 0, 10),
            new Date(2016, 5, 30, 0, 0, 40),
            new Date(2016, 5, 30, 0, 1, 20),
          ]}
        />
      </ReactGantt>,
    );
    expect(screen.getByText('00:00')).toBeTruthy();
    expect(screen.getByText('00:01')).toBeTruthy();
  });

  it('shows the popup with the active step while hovering the bar', () => {
    const { container } = renderGantt();
    const barWrapper = container.querySelector('tbody td:nth-child(2) > div');
    const overlay = barWrapper?.children[2] as HTMLElement;
    fireEvent.mouseEnter(overlay);
    const move = new MouseEvent('mousemove');
    Object.defineProperty(move, 'offsetX', { value: 320 });
    fireEvent(window, move);
    // 320px of 640px over 91 days lands on 2016-08-14, inside phase one.
    expect(container.textContent).toContain('Task Phase One');
    expect(container.textContent).toContain('2016-08-14');
    expect(container.textContent).toContain('First task');
  });

  it('removes the mousemove listener when the pointer leaves the bar', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const { container } = renderGantt();
    const barWrapper = container.querySelector('tbody td:nth-child(2) > div');
    const overlay = barWrapper?.children[2] as HTMLElement;
    fireEvent.mouseEnter(overlay);
    fireEvent.mouseLeave(overlay);
    expect(removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    removeEventListener.mockRestore();
  });

  it('removes the resize listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderGantt();
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListener.mockRestore();
  });

  it('renders diagnostics in debug mode', () => {
    const { container } = renderGantt({ debug: true });
    expect(container.textContent).toContain('Timeline Width: 640');
    expect(container.textContent).toContain('Tick Unit: month');
    expect(container.textContent).toContain('Start Pixel:');
  });
});

describe('GanttPopup', () => {
  it('renders title, step name, and formatted marker time standalone', () => {
    const { container } = render(
      <GanttPopup
        style={{}}
        title="Popup Title"
        description="Popup description"
        activeStep={{ name: 'Step A', color: '#ffffff' }}
        markerTime={new Date(2016, 7, 14)}
      />,
    );
    expect(screen.getByText('Popup Title')).toBeTruthy();
    expect(container.textContent).toContain('Step A');
    expect(container.textContent).toContain('Popup description');
    // Default context date format is YY-MM-DD.
    expect(container.textContent).toContain('16-08-14');
  });
});
