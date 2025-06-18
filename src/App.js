import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Utility Functions ---
// Maps for border thickness and radius options to CSS values
const borderThicknessMap = {
    'none': '0px',
    'thin': '1px',
    'medium': '2px',
    'thick': '4px',
};

const borderRadiusMap = {
    'none': '0rem',
    'small': '0.25rem',
    'medium': '0.5rem',
    'large': '1rem',
    'full': '9999px',
};


// --- Component HTML Generators ---
// These functions generate the static HTML with inline styles for Canvas.

// Accordion (handles multiple items)
const generateAccordionsHtml = (props) => {
  const {
    accordions = [],
    bgColor = '#e2e8f0',
    titleColor = '#1f2937',
    textColor = '#1f2937',
    borderColor = '#e2e8f0',
    borderThickness = 'medium',
    borderRadius = 'medium',
    contentBgColor = '#f1f5f9'
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const outerContainerStyle = `
    font-family: Inter, sans-serif;
    margin-bottom: 1rem;
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    overflow: hidden;
  `;

  const allAccordionsHtml = accordions.map((accordion, index) => {
    const individualAccordionStyle = `display: block; border: none;`;
    const summaryBorderStyle = index < accordions.length - 1 ? `border-bottom: ${borderWidth} solid ${borderColor};` : 'border-bottom: none;';

    const summaryStyle = `
      background-color: ${bgColor};
      padding: 1rem 1.25rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: ${titleColor};
      ${summaryBorderStyle}
      list-style: none;
    `;
    const contentStyle = `
      padding: 1rem 1.25rem;
      background-color: ${contentBgColor};
      color: ${textColor};
    `;
    const arrowStyle = "font-size: 1.2rem; margin-left: 0.5rem;";

    return `
      <details style="${individualAccordionStyle}">
        <summary style="${summaryStyle}">
          <span>${accordion.title}</span>
          <span style="${arrowStyle}">&#9660;</span>
        </summary>
        <div style="${contentStyle}">
          <p style="margin: 0;">${accordion.content}</p>
        </div>
      </details>
    `;
  }).join('');

  return `<div style="${outerContainerStyle}">${allAccordionsHtml}</div>`;
};

// Alerts
const generateAlertHtml = (props) => {
  const {
    message = 'Este es un mensaje de alerta.',
    bgColor = '#3b82f6',
    textColor = '#ffffff',
    borderColor = '#3b82f6',
    borderThickness = 'medium',
    borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const alertStyle = `
    background-color: ${bgColor};
    color: ${textColor};
    padding: 1rem;
    border-radius: ${radius};
    border-top: ${borderWidth} solid ${borderColor};
    border-right: ${borderWidth} solid ${borderColor};
    border-bottom: ${borderWidth} solid ${borderColor};
    border-left: ${parseInt(borderWidth, 10) * 4}px solid ${borderColor};
    margin-bottom: 1rem;
    font-family: Inter, sans-serif;
  `;

  return `
    <div style="${alertStyle}">
      <p style="margin: 0; font-weight: 500;">${message}</p>
    </div>
  `;
};

// Buttons
const generateButtonHtml = (props) => {
  const {
    text = 'Botón de Acción',
    link = '#',
    size = 'medium',
    bgColor = '#4f46e5',
    textColor = '#ffffff',
    borderColor = '#4f46e5',
    borderThickness = 'medium',
    borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.375rem';

  let padding;
  switch (size) {
    case 'small': padding = '0.5rem 0.75rem'; break;
    case 'large': padding = '1rem 1.5rem'; break;
    default: padding = '0.75rem 1rem'; break;
  }

  const buttonStyle = `
    display: inline-block;
    padding: ${padding};
    background-color: ${bgColor};
    color: ${textColor};
    text-decoration: none;
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    font-weight: 600;
    font-size: ${size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem'};
    line-height: 1.25;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    font-family: Inter, sans-serif;
  `;

  return `<a href="${link}" target="_blank" style="${buttonStyle}">${text}</a>`;
};

// Button Group
const generateButtonGroupHtml = (props) => {
  const {
    buttons = [{ text: 'Botón 1', link: '#' }, { text: 'Botón 2', link: '#' }],
    bgColor = '#4f46e5',
    textColor = '#ffffff',
    borderColor = '#4f46e5',
    borderThickness = 'medium',
    borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.375rem';

  const groupStyle = `
    display: flex;
    font-family: Inter, sans-serif;
    margin-bottom: 1rem;
  `;

  const buttonItemsHtml = buttons.map((btn, index) => {
    let btnRadius;
    if (buttons.length === 1) {
        btnRadius = radius;
    } else if (index === 0) {
        btnRadius = `${radius} 0 0 ${radius}`;
    } else if (index === buttons.length - 1) {
        btnRadius = `0 ${radius} ${radius} 0`;
    } else {
        btnRadius = '0';
    }

    const buttonItemStyle = `
      flex: 1;
      padding: 0.75rem 1rem;
      background-color: ${bgColor};
      color: ${textColor};
      text-decoration: none;
      border: ${borderWidth} solid ${borderColor};
      border-left-width: ${index === 0 ? borderWidth : '0'};
      border-radius: ${btnRadius};
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.25;
      text-align: center;
      cursor: pointer;
      white-space: nowrap;
    `;
    return `<a href="${btn.link}" target="_blank" style="${buttonItemStyle}">${btn.text}</a>`;
  }).join('');

  return `<div style="${groupStyle}">${buttonItemsHtml}</div>`;
};


// Card
const generateCardHtml = (props) => {
  const {
    title = 'Título de la Tarjeta',
    text = 'Contenido de ejemplo para la tarjeta.',
    imageSrc = 'https://placehold.co/400x200/e0e0e0/000000?text=Imagen',
    link = '#',
    linkText = 'Leer más',
    bgColor = '#ffffff',
    titleColor = '#1f2937',
    textColor = '#374151',
    linkColor = '#3b82f6',
    borderColor = '#e2e8f0',
    borderThickness = 'medium',
    borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const cardStyle = `
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    overflow: hidden;
    max-width: 320px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    font-family: Inter, sans-serif;
    display: inline-block;
    vertical-align: top;
    background-color: ${bgColor};
  `;
  const imageStyle = "width: 100%; height: auto; display: block;";
  const bodyStyle = `padding: 1.25rem;`;
  const titleStyle = `font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 0.5rem; color: ${titleColor};`;
  const textStyle = `font-size: 1rem; line-height: 1.5; color: ${textColor}; margin-top: 0; margin-bottom: 1rem;`;
  const linkStyle = `color: ${linkColor}; text-decoration: none; font-weight: 600;`;

  return `
    <div style="${cardStyle}">
      ${imageSrc ? `<img src="${imageSrc}" alt="Imagen de la tarjeta" style="${imageStyle}">` : ''}
      <div style="${bodyStyle}">
        <h3 style="${titleStyle}">${title}</h3>
        <p style="${textStyle}">${text}</p>
        <a href="${link}" target="_blank" style="${linkStyle}">${linkText}</a>
      </div>
    </div>
  `;
};

// Card Collection
const generateCardCollectionHtml = (props) => {
  const { cards = [], ...sharedProps } = props;
  const collectionStyle = "display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; font-family: Inter, sans-serif; margin-bottom: 1rem;";
  const cardHtml = cards.map(card => {
    const singleCardProps = { ...sharedProps, ...card };
    const singleCardHtml = generateCardHtml(singleCardProps);
    return singleCardHtml.replace('margin-bottom: 1rem;', '');
  }).join('');
  return `<div style="${collectionStyle}">${cardHtml}</div>`;
};

// Collapse
const generateCollapseHtml = (props) => {
  const {
    title = 'Mostrar/Ocultar Contenido',
    content = 'Este es el contenido que se colapsa.',
    linkColor = '#3b82f6',
    bgColor = '#f8fafc',
    textColor = '#334155',
    borderColor = '#e2e8f0',
    borderThickness = 'medium',
    borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '2px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const containerStyle = "margin-bottom: 1rem; font-family: Inter, sans-serif; display: block;";
  const summaryStyle = `display: inline-block; padding: 0.5rem 0; color: ${linkColor}; text-decoration: none; cursor: pointer; list-style: none; font-weight: 600;`;
  const contentStyle = `
    background-color: ${bgColor};
    padding: 1rem;
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    margin-top: 0.5rem;
    color: ${textColor};
  `;
  const arrowStyle = "font-size: 1rem; margin-left: 0.5rem; vertical-align: middle; display: inline-block; transition: transform 0.2s;";

  return `
    <details style="${containerStyle}" ontoggle="this.querySelector('summary span span').style.transform = this.open ? 'rotate(90deg)' : 'rotate(0deg)'">
      <summary style="${summaryStyle}">
        <span>${title} <span style="${arrowStyle}">&#9654;</span></span>
      </summary>
      <div style="${contentStyle}">
        <p style="margin: 0;">${content}</p>
      </div>
    </details>
  `;
};

// Dropdowns
const generateDropdownsHtml = (props) => {
  const {
    title = 'Menú Desplegable',
    items = [],
    bgColor = '#4f46e5',
    textColor = '#ffffff',
    borderColor = '#e2e8f0',
    borderThickness = 'thin',
    borderRadius = 'medium',
    contentBgColor = '#ffffff',
    contentTextColor = '#374151'
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '1px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const containerStyle = `
    position: relative;
    display: inline-block;
    font-family: Inter, sans-serif;
    margin-bottom: 1rem;
  `;
  const summaryStyle = `
    background-color: ${bgColor};
    color: ${textColor};
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  `;
  const contentContainerStyle = `
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background-color: ${contentBgColor};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
    z-index: 10;
    border: ${borderWidth} solid ${borderColor};
    border-radius: ${radius};
    overflow: hidden;
    padding: 0.5rem 0;
  `;
  const itemStyle = `color: ${contentTextColor}; padding: 0.5rem 1rem; text-decoration: none; display: block;`;

  const listItemsHtml = items.map(item => `
    <a href="${item.link}" target="_blank" style="${itemStyle}">${item.text}</a>
  `).join('');

  return `
    <details style="${containerStyle}">
      <summary style="${summaryStyle}">
        <span>${title}</span>
        <span style="margin-left: 0.5rem; display: inline-block; transition: transform 0.2s;">&#9660;</span>
      </summary>
      <div style="${contentContainerStyle}">
        ${listItemsHtml}
      </div>
    </details>
  `;
};

// List Group
const generateListGroupHtml = (props) => {
  const {
    items = [], flush = false,
    bgColor = '#ffffff', textColor = '#374151', borderColor = '#e5e7eb',
    borderThickness = 'thin', borderRadius = 'medium',
  } = props;

  const borderWidth = borderThicknessMap[borderThickness] || '1px';
  const radius = borderRadiusMap[borderRadius] || '0.5rem';

  const containerStyle = `
    border: ${flush ? 'none' : `${borderWidth} solid ${borderColor}`};
    border-radius: ${flush ? '0' : radius};
    overflow: hidden;
    margin-bottom: 1rem;
    font-family: Inter, sans-serif;
    background-color: ${bgColor};
  `;
  const itemBaseStyle = `display: block; padding: 0.75rem 1.25rem; color: ${textColor}; text-decoration: none;`;
  
  const listItemsHtml = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const borderStyle = !flush && !isLast ? `border-bottom: ${borderWidth} solid ${borderColor};` : '';
    return `<a href="${item.link}" target="_blank" style="${itemBaseStyle} ${borderStyle}">${item.text}</a>`;
  }).join('');

  return `<div style="${containerStyle}">${listItemsHtml}</div>`;
};

// Nav Bar
const generateNavBarHtml = (props) => {
  const {
    brand = 'Mi Curso', items = [], alignment = 'left',
    bgColor = '#1f2937', textColor = '#ffffff', linkColor = '#93c5fd',
    borderThickness = 'none', borderRadius = 'none',
  } = props;

  const navBarStyle = `
    background-color: ${bgColor}; padding: 0.75rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
    font-family: Inter, sans-serif; margin-bottom: 1rem;
    border: ${borderThicknessMap[borderThickness]} solid ${bgColor};
    border-radius: ${borderRadiusMap[borderRadius]};
  `;
  const brandStyle = `color: ${textColor}; font-weight: 700; font-size: 1.25rem; text-decoration: none;`;
  const ulStyle = `display: flex; list-style: none; margin: 0; padding: 0; gap: 1.5rem; ${alignment === 'right' ? 'margin-left: auto;' : alignment === 'center' ? 'margin: 0 auto;' : ''}`;
  const linkStyle = `color: ${linkColor}; text-decoration: none; font-weight: 500;`;

  return `
    <nav style="${navBarStyle}">
      <a href="#" style="${brandStyle}">${brand}</a>
      <ul style="${ulStyle}">
        ${items.map(item => `<li><a href="${item.link}" target="_blank" style="${linkStyle}">${item.text}</a></li>`).join('')}
      </ul>
    </nav>
  `;
};

// Hero Banners
const generateHeroBannerHtml = (props) => {
  const {
    title = 'Bienvenido a mi Curso', subtitle = 'Prepárate para aprender y crecer.',
    buttonText = 'Empezar Aquí', buttonLink = '#',
    imageSrc = 'https://placehold.co/1200x400/334155/ffffff?text=Banner',
    overlayColor = '#000000', overlayOpacity = 0.5,
    titleColor = '#ffffff', textColor = '#e5e7eb',
    buttonBgColor = '#4f46e5', buttonTextColor = '#ffffff',
    borderThickness = 'none', borderRadius = 'none',
  } = props;

  const bannerStyle = `
    position: relative; width: 100%; min-height: 300px;
    background-image: url('${imageSrc}'); background-size: cover; background-position: center;
    display: flex; align-items: center; justify-content: center; text-align: center;
    font-family: Inter, sans-serif; margin-bottom: 1rem; overflow: hidden;
    border: ${borderThicknessMap[borderThickness]} solid ${overlayColor};
    border-radius: ${borderRadiusMap[borderRadius]};
  `;
  const overlayStyle = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: ${overlayColor}; opacity: ${overlayOpacity}; z-index: 1;`;
  const contentStyle = "position: relative; z-index: 2; padding: 2rem; max-width: 800px;";
  const titleStyle = `font-size: 2.5rem; font-weight: 800; margin: 0 0 0.5rem; line-height: 1.2; color: ${titleColor};`;
  const subtitleStyle = `font-size: 1.25rem; margin: 0 0 1.5rem; line-height: 1.5; color: ${textColor};`;
  const buttonStyle = `display: inline-block; padding: 0.75rem 1.5rem; background-color: ${buttonBgColor}; color: ${buttonTextColor}; text-decoration: none; border-radius: 0.375rem; font-weight: 600; font-size: 1rem; border: none; cursor: pointer;`;

  return `<div style="${bannerStyle}"><div style="${overlayStyle}"></div><div style="${contentStyle}"><h2 style="${titleStyle}">${title}</h2><p style="${subtitleStyle}">${subtitle}</p><a href="${buttonLink}" target="_blank" style="${buttonStyle}">${buttonText}</a></div></div>`;
};

// Pagination
const generatePaginationHtml = (props) => {
  const {
    pages = [], currentPageIndex = 0,
    bgColor = '#ffffff', textColor = '#6b7280', linkColor = '#3b82f6',
    activeBgColor = '#3b82f6', activeTextColor = '#ffffff', borderColor = '#e5e7eb',
    borderThickness = 'thin', borderRadius = 'medium',
  } = props;
  const borderWidth = borderThicknessMap[borderThickness] || '1px';
  const radius = borderRadiusMap[borderRadius] || '0.25rem';
  const containerStyle = "display: flex; list-style: none; padding: 0; margin: 0 auto 1rem auto; justify-content: center; font-family: Inter, sans-serif; gap: 0.25rem;";
  const linkBaseStyle = `display: block; padding: 0.5rem 1rem; text-decoration: none; border: ${borderWidth} solid ${borderColor}; border-radius: ${radius}; font-weight: 500;`;
  
  let pageItemsHtml = pages.map((page, index) => {
    const isCurrent = index === currentPageIndex;
    const style = isCurrent ? `${linkBaseStyle} background-color: ${activeBgColor}; color: ${activeTextColor}; border-color: ${activeBgColor};` : `${linkBaseStyle} background-color: ${bgColor}; color: ${linkColor};`;
    return `<li><a href="${page.link}" style="${style}" ${isCurrent ? 'aria-current="page"' : ''}>${page.text}</a></li>`;
  }).join('');
  
  const prevLink = pages[Math.max(0, currentPageIndex - 1)]?.link || '#';
  const nextLink = pages[Math.min(pages.length - 1, currentPageIndex + 1)]?.link || '#';
  const navLinkStyle = `${linkBaseStyle} background-color: ${bgColor}; color: ${textColor};`;

  return `<nav aria-label="Navegación de Páginas" style="margin-bottom: 1rem;"><ul style="${containerStyle}"><li><a href="${prevLink}" style="${navLinkStyle}">&laquo;</a></li>${pageItemsHtml}<li><a href="${nextLink}" style="${navLinkStyle}">&raquo;</a></li></ul></nav>`;
};

// Progress Bar
const generateProgressHtml = (props) => {
  const {
    percentage = 50, showText = true, bgColor = '#3b82f6',
    containerBgColor = '#e5e7eb', textColor = '#ffffff',
    borderThickness = 'none', borderRadius = 'medium',
  } = props;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = borderRadiusMap[borderRadius] || '0.5rem';
  const containerStyle = `width: 100%; background-color: ${containerBgColor}; border-radius: ${radius}; overflow: hidden; height: 1.5rem; margin-bottom: 1rem; font-family: Inter, sans-serif; border: ${borderThicknessMap[borderThickness]} solid ${containerBgColor};`;
  const barStyle = `width: ${clampedPercentage}%; background-color: ${bgColor}; height: 100%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.875rem; transition: width 0.3s ease-in-out;`;
  return `<div style="${containerStyle}"><div style="${barStyle}">${showText ? `<span style="color: ${textColor}; padding: 0 0.5rem;">${clampedPercentage}%</span>` : ''}</div></div>`;
};

// Breadcrumbs
const generateBreadcrumbsHtml = (props) => {
  const {
    items = [], textColor = '#4b5563', linkColor = '#3b82f6',
    separatorColor = '#d1d5db', borderThickness = 'none', borderRadius = 'none',
  } = props;
  const navStyle = `font-family: Inter, sans-serif; margin-bottom: 1rem; border: ${borderThicknessMap[borderThickness]} solid ${separatorColor}; border-radius: ${borderRadiusMap[borderRadius]}; padding: 0.5rem 1rem; background-color: #f8fafc;`;
  const olStyle = "display: flex; list-style: none; padding: 0; margin: 0; align-items: center; gap: 0.5rem;";
  const linkStyle = `color: ${linkColor}; text-decoration: none; font-weight: 500;`;
  const spanStyle = `color: ${textColor}; font-weight: 500;`;
  const separatorStyle = `color: ${separatorColor};`;

  const listItemsHtml = items.map((item, index) => {
    const isLast = index === items.length - 1;
    return `<li style="display: flex; align-items: center; gap: 0.5rem;">${isLast ? `<span style="${spanStyle}">${item.text}</span>` : `<a href="${item.link}" target="_blank" style="${linkStyle}">${item.text}</a>`}${!isLast ? `<span style="${separatorStyle}">/</span>` : ''}</li>`;
  }).join('');

  return `<nav aria-label="breadcrumb" style="${navStyle}"><ol style="${olStyle}">${listItemsHtml}</ol></nav>`;
};

// Badges
const generateBadgesHtml = (props) => {
  const {
    text = 'Nuevo', bgColor = '#22c55e', textColor = '#ffffff',
    borderThickness = 'none', borderRadius = 'full',
  } = props;
  const badgeStyle = `display: inline-block; padding: 0.25em 0.6em; font-size: 75%; font-weight: 700; line-height: 1; text-align: center; white-space: nowrap; vertical-align: baseline; border-radius: ${borderRadiusMap[borderRadius]}; background-color: ${bgColor}; color: ${textColor}; font-family: Inter, sans-serif; margin-right: 0.5rem; border: ${borderThicknessMap[borderThickness]} solid ${bgColor};`;
  return `<span style="${badgeStyle}">${text}</span>`;
};


// --- React App Component ---

// --- Memoized & Debounced Form Controls ---
const DebouncedInputControl = React.memo(({ l, pK, t = 'text', initialValue, onPropChange }) => {
    const [value, setValue] = useState(initialValue);
    const onPropChangeStable = useCallback(onPropChange, []);

    // Effect to update global state after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
             if (value !== initialValue) {
                onPropChangeStable(pK, value);
            }
        }, 300); // 300ms delay

        return () => clearTimeout(handler);
    }, [value, pK, onPropChangeStable, initialValue]);

    // Effect to sync local state if the prop changes from parent
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">{l || pK.replace(/([A-Z])/g, ' $1')}:</label>
            <input 
                type={t} 
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                value={value} 
                onChange={e => setValue(t === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)} 
            />
        </div>
    );
});

const DebouncedTextareaControl = React.memo(({ l, pK, initialValue, onPropChange }) => {
    const [value, setValue] = useState(initialValue);
    const onPropChangeStable = useCallback(onPropChange, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (value !== initialValue) {
                onPropChangeStable(pK, value);
            }
        }, 300);
        
        return () => clearTimeout(handler);
    }, [value, pK, onPropChangeStable, initialValue]);
    
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">{l || pK.replace(/([A-Z])/g, ' $1')}:</label>
            <textarea 
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 h-20" 
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />
        </div>
    );
});

const ColorPickerControl = React.memo(({ l, pK, value, onPropChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">{l || pK.replace(/([A-Z])/g, ' $1')}:</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                className="p-0 border-none w-10 h-10 rounded-md cursor-pointer"
                defaultValue={value}
                onInput={e => onPropChange(pK, e.currentTarget.value)}
            />
            <span className="text-gray-600 font-mono text-sm">{value}</span>
        </div>
    </div>
));

const SelectControl = React.memo(({ l, pK, opts, value, onPropChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">{l || pK.replace(/([A-Z])/g, ' $1')}:</label>
        <select className="shadow-sm border rounded w-full py-2 px-3" value={value} onChange={e => onPropChange(pK, e.target.value)}>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    </div>
));

const BorderThicknessControl = React.memo(({ pK, value, onPropChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Grosor del Borde</label>
      <div className="flex flex-wrap gap-2">
        {Object.keys(borderThicknessMap).map(option => (
          <button key={option} type="button" onClick={() => onPropChange(pK, option)}
            className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all ${value === option ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300 hover:border-gray-400'}`}
            title={option}
          >
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-[10px]" style={{ border: `${borderThicknessMap[option]} solid #4b5563` }}>
              {borderThicknessMap[option]}
            </div>
          </button>
        ))}
      </div>
    </div>
));

const BorderRadiusControl = React.memo(({ pK, value, onPropChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Redondeado del Borde</label>
      <div className="flex flex-wrap gap-2">
        {Object.keys(borderRadiusMap).map(option => (
          <button key={option} type="button" onClick={() => onPropChange(pK, option)}
            className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all ${value === option ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300 hover:border-gray-400'}`}
            title={option}
          >
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-600 flex items-center justify-center text-gray-600 font-bold text-xs" style={{ borderRadius: borderRadiusMap[option] }}>
              {option.charAt(0).toUpperCase()}
            </div>
          </button>
        ))}
      </div>
    </div>
));

const ItemListEditor = React.memo(({ itemType, fields, items, onItemChange, onAddItem, onRemoveItem }) => (
    <div><h4 className="text-lg font-semibold mb-2 mt-4 capitalize">{itemType}</h4>
      {items.map((item, index) => (
        <div key={`${itemType}-${index}`} className="space-y-2 mb-3 p-3 border rounded bg-gray-50/50 relative">
          <h5 className="font-bold text-gray-600 capitalize">{itemType.slice(0, -1)} {index + 1}</h5>
          {Object.entries(fields).map(([key, type]) => (
            <div key={key}><label className="block text-gray-600 text-xs font-bold mb-1 capitalize">{key}</label>
              <input type={type} className="shadow-sm border rounded w-full py-1 px-2 text-sm" value={item[key]} onChange={e => onItemChange(itemType, index, key, e.target.value)} />
            </div>
          ))}
          <button onClick={() => onRemoveItem(itemType, index)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold p-0 w-5 h-5 rounded-full text-xs flex items-center justify-center">&times;</button>
        </div>
      ))}
      <button onClick={() => onAddItem(itemType)} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-sm">Agregar</button>
    </div>
  ));

function App() {
  const [selectedComponent, setSelectedComponent] = useState('Buttons');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // Initial component properties for each type
  const [componentProps, setComponentProps] = useState({
    Accordion: {
      accordions: [{ title: 'Acordeón de Ejemplo 1', content: 'Aquí va el contenido detallado.' }, { title: 'Acordeón 2', content: 'Contenido del segundo.' }],
      bgColor: '#f3f4f6', titleColor: '#1f2937', textColor: '#374151', borderColor: '#d1d5db', contentBgColor: '#ffffff',
      borderThickness: 'medium', borderRadius: 'medium'
    },
    Alerts: {
      message: '¡Atención! Este es un mensaje informativo.',
      bgColor: '#3b82f6', textColor: '#ffffff', borderColor: '#2563eb',
      borderThickness: 'medium', borderRadius: 'medium'
    },
    Buttons: {
      text: 'Mi Botón', link: '#', size: 'medium',
      bgColor: '#4f46e5', textColor: '#ffffff', borderColor: '#4338ca',
      borderThickness: 'medium', borderRadius: 'medium'
    },
    ButtonGroup: {
      buttons: [{ text: 'Opción A', link: '#' }, { text: 'Opción B', link: '#' }],
      bgColor: '#6b7280', textColor: '#ffffff', borderColor: '#4b5563',
      borderThickness: 'medium', borderRadius: 'medium'
    },
    Card: {
      title: 'Título de la Tarjeta', text: 'Descripción breve de la tarjeta.', imageSrc: 'https://placehold.co/400x200/e0e0e0/000000?text=Imagen', link: '#', linkText: 'Ver Detalles',
      bgColor: '#ffffff', titleColor: '#1e293b', textColor: '#475569', linkColor: '#3b82f6', borderColor: '#e2e8f0',
      borderThickness: 'thin', borderRadius: 'large'
    },
    CardCollection: {
      cards: [{ title: 'Curso A', text: 'Desarrollo web.', imageSrc: 'https://placehold.co/400x200/a78bfa/ffffff?text=Web' }, { title: 'Curso B', text: 'Programación.', imageSrc: 'https://placehold.co/400x200/2dd4bf/ffffff?text=Program' }],
      bgColor: '#ffffff', titleColor: '#1e293b', textColor: '#475569', linkColor: '#3b82f6', borderColor: '#e2e8f0',
      borderThickness: 'thin', borderRadius: 'large'
    },
    Collapse: {
      title: 'Mostrar/Ocultar Contenido', content: 'Este texto se puede mostrar u ocultar.',
      linkColor: '#3b82f6', bgColor: '#f8fafc', textColor: '#334155', borderColor: '#e2e8f0',
      borderThickness: 'thin', borderRadius: 'medium'
    },
    Dropdowns: {
      title: 'Menú Principal', items: [{ text: 'Sección 1', link: '#' }, { text: 'Sección 2', link: '#' }],
      bgColor: '#4f46e5', textColor: '#ffffff', borderColor: '#d1d5db', contentBgColor: '#ffffff', contentTextColor: '#374151',
      borderThickness: 'thin', borderRadius: 'medium'
    },
    ListGroup: {
      items: [{ text: 'Tema 1', link: '#' }, { text: 'Tema 2', link: '#' }], flush: false,
      bgColor: '#ffffff', textColor: '#374151', borderColor: '#e5e7eb',
      borderThickness: 'thin', borderRadius: 'medium'
    },
    NavBar: {
      brand: 'Nombre del Curso', items: [{ text: 'Módulos', link: '#' }, { text: 'Tareas', link: '#' }], alignment: 'left',
      bgColor: '#1f2937', textColor: '#ffffff', linkColor: '#93c5fd',
      borderThickness: 'none', borderRadius: 'none'
    },
    HeroBanners: {
      title: 'Bienvenido al Semestre', subtitle: '¡Explora y aprende!', buttonText: 'Ver Agenda', buttonLink: '#', imageSrc: 'https://placehold.co/1200x400/334155/ffffff?text=Banner', overlayColor: '#000000', overlayOpacity: 0.5,
      titleColor: '#ffffff', textColor: '#e5e7eb', buttonBgColor: '#4f46e5', buttonTextColor: '#ffffff',
      borderThickness: 'none', borderRadius: 'none'
    },
    Pagination: {
      currentPageIndex: 0, pages: [{ text: '1', link: '#p1' }, { text: '2', link: '#p2' }],
      bgColor: '#ffffff', textColor: '#6b7280', linkColor: '#3b82f6', activeBgColor: '#3b82f6', activeTextColor: '#ffffff', borderColor: '#e5e7eb',
      borderThickness: 'thin', borderRadius: 'medium'
    },
    Progress: {
      percentage: 75, showText: true, bgColor: '#3b82f6', containerBgColor: '#e5e7eb', textColor: '#ffffff',
      borderThickness: 'none', borderRadius: 'full'
    },
    Breadcrumbs: {
      items: [{ text: 'Inicio', link: '#' }, { text: 'Cursos', link: '#' }],
      textColor: '#4b5563', linkColor: '#3b82f6', separatorColor: '#d1d5db',
      borderThickness: 'none', borderRadius: 'none'
    },
    Badges: {
      text: 'Nuevo', bgColor: '#22c55e', textColor: '#ffffff',
      borderThickness: 'none', borderRadius: 'full'
    },
  });

  const componentList = Object.keys(componentProps);
  
  const htmlGeneratorMap = {
    Accordion: generateAccordionsHtml, Alerts: generateAlertHtml, Badges: generateBadgesHtml,
    Breadcrumbs: generateBreadcrumbsHtml, ButtonGroup: generateButtonGroupHtml, Buttons: generateButtonHtml,
    Card: generateCardHtml, CardCollection: generateCardCollectionHtml, Collapse: generateCollapseHtml,
    Dropdowns: generateDropdownsHtml, HeroBanners: generateHeroBannerHtml, ListGroup: generateListGroupHtml,
    NavBar: generateNavBarHtml, Pagination: generatePaginationHtml, Progress: generateProgressHtml,
  };

  const handlePropChange = useCallback((componentName, key, value) => {
    setComponentProps(prevProps => ({
      ...prevProps,
      [componentName]: { ...prevProps[componentName], [key]: value }
    }));
  }, []);

  useEffect(() => {
    if (selectedComponent && htmlGeneratorMap[selectedComponent]) {
      setGeneratedHtml(htmlGeneratorMap[selectedComponent](componentProps[selectedComponent]));
    }
  }, [selectedComponent, componentProps]);
  
  const handleItemChange = useCallback((itemType, itemIndex, propKey, value) => {
    setComponentProps(p => {
      const newItems = [...p[selectedComponent][itemType]];
      newItems[itemIndex] = { ...newItems[itemIndex], [propKey]: value };
      return { ...p, [selectedComponent]: { ...p[selectedComponent], [itemType]: newItems } };
    });
  }, [selectedComponent]);
  
  const handleAddItem = useCallback((itemType) => {
    setComponentProps(p => {
        const currentItems = p[selectedComponent][itemType];
        let newItem = { text: 'Nuevo', link: '#' };
        if (itemType === 'cards') newItem = { ...newItem, title: 'Nueva Tarjeta', imageSrc: 'https://placehold.co/400x200/cccccc/000000?text=Nueva' };
        if (itemType === 'accordions') newItem = { ...newItem, title: `Nuevo Acordeón`, content: `Contenido nuevo.` };
        return { ...p, [selectedComponent]: { ...p[selectedComponent], [itemType]: [...currentItems, newItem] }};
    });
  }, [selectedComponent]);

  const handleRemoveItem = useCallback((itemType, index) => {
    setComponentProps(p => ({
      ...p,
      [selectedComponent]: {
        ...p[selectedComponent],
        [itemType]: p[selectedComponent][itemType].filter((_, i) => i !== index)
      }
    }));
  }, [selectedComponent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml).then(() => {
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
    });
  };
  
  const customizationForms = useMemo(() => {
    return componentList.map(componentName => {
        const props = componentProps[componentName];
        const hasBorder = 'borderThickness' in props;
        const onPropChange = (key, value) => handlePropChange(componentName, key, value);
        
        const I = (pK, l, t) => <DebouncedInputControl l={l} pK={pK} t={t} initialValue={props[pK]} onPropChange={onPropChange} />;
        const T = (pK, l) => <DebouncedTextareaControl l={l} pK={pK} initialValue={props[pK]} onPropChange={onPropChange} />;
        const C = (pK, l) => <ColorPickerControl l={l} pK={pK} value={props[pK]} onPropChange={onPropChange} />;
        const S = (pK, l, opts) => <SelectControl l={l} pK={pK} opts={opts} value={props[pK]} onPropChange={onPropChange} />;
        const BT = (pK) => <BorderThicknessControl pK={pK} value={props[pK]} onPropChange={onPropChange} />;
        const BR = (pK) => <BorderRadiusControl pK={pK} value={props[pK]} onPropChange={onPropChange} />;
        const IL = (itemType, fields) => <ItemListEditor itemType={itemType} fields={fields} items={props[itemType]} onItemChange={handleItemChange} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} />;

        let formContent;
        switch (componentName) {
            case 'Accordion': formContent = <> {C("bgColor", "Fondo de Título")} {C("titleColor", "Color de Título")} {C("contentBgColor", "Fondo de Contenido")} {C("textColor", "Color de Texto")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} {IL("accordions", { title: 'text', content: 'text' })} </>; break;
            case 'Alerts': formContent = <> {T("message")} {C("bgColor")} {C("textColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} </>; break;
            case 'Buttons': formContent = <> {I("text", "Texto del Botón")} {I("link")} {S("size", null, ['small', 'medium', 'large'])} {C("bgColor")} {C("textColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} </>; break;
            case 'ButtonGroup': formContent = <> {C("bgColor")} {C("textColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} {IL("buttons", { text: 'text', link: 'text' })} </>; break;
            case 'Card': formContent = <> {I("title")} {T("text")} {I("imageSrc", "URL de Imagen")} {I("link")} {I("linkText")} {C("bgColor")} {C("titleColor")} {C("textColor")} {C("linkColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} </>; break;
            case 'CardCollection': formContent = <> {C("bgColor", "Fondo de Tarjeta")} {C("titleColor", "Color de Título")} {C("textColor", "Color de Texto")} {C("linkColor", "Color de Enlace")} {C("borderColor", "Color de Borde")} {BT("borderThickness")} {BR("borderRadius")} {IL("cards", { title: 'text', text: 'text', imageSrc: 'text', link: 'text', linkText: 'text' })} </>; break;
            case 'Collapse': formContent = <> {I("title", "Texto del Activador")} {T("content", "Contenido Oculto")} {C("linkColor")} {C("bgColor")} {C("textColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} </>; break;
            case 'Dropdowns': formContent = <> {I("title")} {C("bgColor", "Fondo del Botón")} {C("textColor", "Texto del Botón")} {C("contentBgColor", "Fondo del Menú")} {C("contentTextColor", "Texto del Menú")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} {IL("items", { text: 'text', link: 'text' })} </>; break;
            case 'ListGroup': formContent = <> <div className="mb-4"><label className="inline-flex items-center"><input type="checkbox" checked={props.flush} onChange={e => onPropChange('flush', e.target.checked)} /><span className="ml-2">Sin bordes (flush)</span></label></div> {C("bgColor")} {C("textColor")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} {IL("items", { text: 'text', link: 'text' })} </>; break;
            case 'NavBar': formContent = <> {I("brand")} {S("alignment", null, ['left', 'center', 'right'])} {C("bgColor")} {C("textColor", "Color de Marca")} {C("linkColor")} {hasBorder && <> {BT('borderThickness')} {BR('borderRadius')} </>} {IL("items", { text: 'text', link: 'text' })} </>; break;
            case 'HeroBanners': formContent = <> {I("title")} {T("subtitle")} {I("buttonText")} {I("buttonLink")} {I("imageSrc")} {C("overlayColor")} {I("overlayOpacity", null, "number")} {C("titleColor")} {C("textColor")} {C("buttonBgColor")} {C("buttonTextColor")} {hasBorder && <> {BT('borderThickness')} {BR('borderRadius')} </>} </>; break;
            case 'Pagination': formContent = <> {I("currentPageIndex", "Índice Página Activa", "number")} {C("bgColor", "Fondo")} {C("textColor", "Texto (Nav)")} {C("linkColor")} {C("activeBgColor", "Fondo Activo")} {C("activeTextColor", "Texto Activo")} {C("borderColor")} {BT('borderThickness')} {BR('borderRadius')} {IL("pages", { text: 'text', link: 'text' })} </>; break;
            case 'Progress': formContent = <> {I("percentage", null, "number")} <div className="mb-4"><label className="inline-flex items-center"><input type="checkbox" checked={props.showText} onChange={e => onPropChange('showText', e.target.checked)} /><span className="ml-2">Mostrar texto</span></label></div> {C("bgColor", "Color de Barra")} {C("containerBgColor", "Fondo de Contenedor")} {C("textColor")} {hasBorder && <> {BT('borderThickness')} {BR('borderRadius')} </>} </>; break;
            case 'Breadcrumbs': formContent = <> {C("textColor", "Texto (Actual)")} {C("linkColor")} {C("separatorColor")} {hasBorder && <> {BT('borderThickness')} {BR('borderRadius')} </>} {IL("items", { text: 'text', link: 'text' })} </>; break;
            case 'Badges': formContent = <> {I("text")} {C("bgColor")} {C("textColor")} {hasBorder && <> {BT('borderThickness')} {BR('borderRadius')} </>} </>; break;
            default: formContent = null;
        }
        
        return (
            <div key={componentName} style={{ display: selectedComponent === componentName ? 'block' : 'none' }}>
                {formContent}
            </div>
        );
    });
  }, [componentList, componentProps, handlePropChange, handleItemChange, handleAddItem, handleRemoveItem]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      <aside className="w-full md:w-64 bg-white p-6 shadow-lg overflow-y-auto flex-shrink-0 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Componentes</h2>
        <ul className="space-y-1">
          {componentList.map((component) => (
            <li key={component}>
              <button
                onClick={() => setSelectedComponent(component)}
                className={`w-full text-left font-medium py-2 px-3 rounded-md transition-all duration-150 text-sm ${selectedComponent === component ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {component.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Generador de Componentes para Canvas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="p-6 bg-white rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Personalizar: <span className="text-blue-600">{selectedComponent.replace(/([A-Z])/g, ' $1').trim()}</span>
              </h2>
              {customizationForms}
            </section>

            <div className="space-y-8">
                <section className="p-6 bg-white rounded-xl shadow-xl border border-gray-200">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Previsualización</h2>
                  <div className="border border-dashed border-gray-300 p-4 rounded-md bg-gray-50" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                </section>

                <section className="p-6 bg-gray-800 rounded-xl shadow-xl">
                  <h2 className="text-2xl font-bold mb-4 text-white">HTML Generado</h2>
                  <div className="bg-gray-900 text-green-300 p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap break-all">
                    {generatedHtml}
                  </div>
                  <button onClick={handleCopy} className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg">
                    {showCopyMessage ? '¡Copiado!' : 'Copiar HTML al Portapapeles'}
                  </button>
                </section>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;