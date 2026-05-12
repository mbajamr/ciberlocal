   
const ThemeManager = (() => {
    const THEME_KEY = 'theme';

    function getTheme() {
        return localStorage.getItem(THEME_KEY) || 'light-mode';
    }

    function applyTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(theme);
    }

    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
    }

    function toggleTheme() {
const rootStyles = getComputedStyle(document.documentElement);
//const iconColor = rootStyles.getPropertyValue('--svg-fill-color').trim();
//const iconColor = getComputedStyle(document.documentElement).getPropertyValue('--svg-fill-color');
//const iconColor = getComputedStyle(document.documentElement).getPropertyValue('--svg-fill-color')
//alert("toggleTheme:  ");

//const svg = document.querySelector('svg');
//const svgStyles = getComputedStyle(svg);
//const fill = svgStyles.fill;
//alert(fill);

//const styles2a = getComputedStyle(document.body);
//const color2a = styles2a.color;
//alert(`color2a = ${color2a}`);

//const svg3a = document.querySelector('svg');
//const styles3a = getComputedStyle(svg3a);
//alert(`SVG fill a = ${styles3a.fill}`);

  //const styles10 = getComputedStyle(document.documentElement);
  //const color10 = styles10.getPropertyValue('--color');
  //alert(`--color10 = [${color10}]`);


        const newTheme = getTheme() === 'dark-mode'
            ? 'light-mode'
            : 'dark-mode';

        setTheme(newTheme);

//const el = document.body; // or whatever element has the variable
//const styles = getComputedStyle(el);
//const cssVar = styles.getPropertyValue('--color');
//alert(`--color = ${cssVar}`);

//const cssVar1 = getComputedStyle(document.documentElement).getPropertyValue('--color');
//alert(`--color1 = ${cssVar1}`);

//const styles2 = getComputedStyle(document.body);
//const color2 = styles2.color;
//alert(`color2 = ${color2}`);

//const svg3 = document.querySelector('svg');
//const styles3 = getComputedStyle(svg3);
//alert(`SVG fill = ${styles3.fill}`);

//const root4 = getComputedStyle(document.documentElement);
//alert('--color4:', root4.getPropertyValue('--color'));

//const bodyColor5 = getComputedStyle(document.body).color;
//alert('body color5:', bodyColor5);

//const styles6 = getComputedStyle(document.documentElement);
//const cssVar6 = styles6.getPropertyValue('--color');

//alert(`--color6 = [${cssVar6}]`);
    }

    function init() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            applyTheme(getTheme());
        });

        // Sync across tabs
        window.addEventListener('storage', (event) => {
            if (event.key === THEME_KEY && event.newValue) {
                applyTheme(event.newValue);
            }
        });
    }

    return {
        init,
        toggleTheme,
        setTheme,
        getTheme
    };
})();

