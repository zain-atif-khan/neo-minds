'use client';

import { isValidElement, useLayoutEffect, useRef, useState } from 'react';
import './BranchedMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'Internship Journey',
    children: [
      {
        value: 'apply',
        number: '01',
        label: 'Apply',
        description: 'Submit your profile & verified project portfolio'
      },
      {
        value: 'assessment',
        number: '02',
        label: 'Assessment',
        description: 'Complete practical diagnostic benchmark'
      },
      {
        value: 'shortlist',
        number: '03',
        label: 'Shortlist',
        description: 'Direct matching based on verified project proof'
      },
      {
        value: 'interview',
        number: '04',
        label: 'Interview',
        description: 'Technical conversation with company founders/leads'
      },
      {
        value: 'internship',
        number: '05',
        label: 'Internship',
        description: 'Begin paid work with ongoing mentorship'
      }
    ]
  }
];

const PAD = 6;
const MARK = 16;

const toSet = open => new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

export default function BranchedMenu({
  items = DEFAULT_ITEMS,
  defaultOpen = 0,
  defaultActive = 'apply',
  onSelect,
  onToggle,
  color = '#0B1736',
  accentColor = '#1677FF',
  lineColor = '#DCE6F2',
  width = 440,
  rowHeight = 64,
  indent = 44,
  trunk = 14,
  radius = 12,
  lineWidth = 1.5,
  fontSize = 15,
  drawDuration = 400,
  foldDuration = 300,
  className = ''
}) {
  const [open, setOpen] = useState(() => toSet(defaultOpen));
  const [active, setActive] = useState(() => {
    if (defaultActive) return defaultActive;
    const first = items.find((it, i) => it.children && toSet(defaultOpen).has(i));
    return first?.children?.[0]?.value ?? '';
  });
  const navRef = useRef(null);
  const heads = useRef([]);
  const markerRef = useRef(null);
  const latest = useRef({});
  latest.current = { onSelect, onToggle };

  const activeSection = items.findIndex(it => it.children?.some(kid => kid.value === active));
  const activeIdx = activeSection >= 0 ? items[activeSection]?.children?.findIndex(kid => kid.value === active) ?? -1 : -1;
  const markerShown = false;

  useLayoutEffect(() => {
    const place = glide => {
      const m = markerRef.current;
      const el = heads.current[activeSection];
      if (!m) return;
      const on = markerShown && el;
      if (!glide) m.style.transition = 'none';
      if (on) m.style.top = `${el.offsetTop + (el.offsetHeight - MARK) / 2}px`;
      m.toggleAttribute('data-on', Boolean(on));
      if (!glide) {
        void m.offsetHeight;
        m.style.transition = '';
      }
    };
    place(true);
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      place(false);
    });
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [activeSection, markerShown, items, fontSize, rowHeight]);

  const select = (value, item) => {
    setActive(value);
    latest.current.onSelect?.(value, item);
  };

  const toggle = i => {
    setOpen(prev => {
      const next = new Set(prev);
      const isOpen = !next.has(i);
      if (isOpen) next.add(i);
      else next.delete(i);
      latest.current.onToggle?.(i, isOpen);
      return next;
    });
  };

  const r = Math.min(radius, rowHeight / 2 - 2);
  const endX = indent - 8;
  const rowY = k => PAD + k * rowHeight + rowHeight / 2;
  const branch = k => `M ${trunk} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const reach = k => `M ${trunk} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const length = k => rowY(k) - r + (Math.PI * r) / 2 + (endX - trunk - r);

  return (
    <nav
      ref={navRef}
      className={`branched-menu${className ? ` ${className}` : ''}`}
      style={{
        '--bm-w': typeof width === 'number' ? `${width}px` : width,
        '--bm-ink': color,
        '--bm-accent': accentColor,
        '--bm-line': lineColor,
        '--bm-font': `${fontSize}px`,
        '--bm-row': `${rowHeight}px`,
        '--bm-indent': `${indent}px`,
        '--bm-line-w': `${lineWidth}px`,
        '--bm-draw': `${drawDuration}ms`,
        '--bm-fold': `${foldDuration}ms`
      }}
    >
      <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
      {items.map((item, i) => {
        const kids = item.children;
        const isOpen = kids ? open.has(i) : false;
        const leafValue = item.value ?? item.label;
        const leafActive = !kids && leafValue === active;
        const bodyH = kids ? PAD * 2 + kids.length * rowHeight : 0;
        return (
          <div key={item.value ?? item.label} className="branched-menu__section" data-open={isOpen ? '' : undefined}>
            <button
              ref={el => {
                heads.current[i] = el;
              }}
              type="button"
              className="branched-menu__head"
              aria-expanded={kids ? isOpen : undefined}
              aria-current={leafActive ? 'true' : undefined}
              data-active={leafActive ? '' : undefined}
              onClick={() => (kids ? toggle(i) : select(leafValue, item))}
            >
              {/* Blue top stem on the trunk line right beside Internship Journey */}
              <span className="branched-menu__head-stem" style={{ left: trunk }} />
              <span className="branched-menu__head-title">{item.label}</span>
            </button>
            {kids ? (
              <div className="branched-menu__body" style={{ height: isOpen ? bodyH : 0 }}>
                <div className="branched-menu__fold">
                  <div className="branched-menu__tree" style={{ height: bodyH }}>
                    <svg className="branched-menu__lines" width={indent} height={bodyH} aria-hidden="true">
                      {/* Base straight vertical trunk line running down continuously to the last stage */}
                      <path className="branched-menu__base" d={`M ${trunk} 0 V ${rowY(kids.length - 1)}`} />
                      
                      {/* Continuous blue trunk line running down from beside the header to the last stage */}
                      <path 
                        className="branched-menu__trunk-active" 
                        d={`M ${trunk} 0 V ${rowY(kids.length - 1)}`} 
                      />

                      {/* Inactive curved branch paths */}
                      {kids.map((kid, k) => (
                        <path key={kid.value} className="branched-menu__base" d={branch(k)} />
                      ))}

                      {/* Active animated blue curved reach path */}
                      {kids.map((kid, k) => (
                        <path
                          key={kid.value}
                          className="branched-menu__reach"
                          d={reach(k)}
                          style={{
                            strokeDasharray: length(k),
                            strokeDashoffset: kid.value === active ? 0 : length(k)
                          }}
                        />
                      ))}
                    </svg>
                    {kids.map((kid, k) => (
                      <button
                        key={kid.value}
                        type="button"
                        className="branched-menu__item"
                        style={{ top: PAD + k * rowHeight }}
                        aria-current={kid.value === active ? 'true' : undefined}
                        data-active={kid.value === active ? '' : undefined}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => select(kid.value, kid)}
                      >
                        {kid.number ? (
                          <span className="branched-menu__step-num">{kid.number}</span>
                        ) : null}
                        <div className="branched-menu__content">
                          <span className="branched-menu__label">{kid.label}</span>
                          {kid.description ? (
                            <span className="branched-menu__desc">{kid.description}</span>
                          ) : null}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
