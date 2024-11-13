import ErrorMessage from './ErrorMessage';

export default function Header({ children, level = 1, color , onClick}) {
    level = Number(level);
    const style = {color: color ? `var(--${color})` : undefined }

    if (level === 1) {
        return <h1 style={style} onClick={onClick?onClick:undefined}>{children}</h1>;
    } else if (level === 2) {
        return <h2 style={style} onClick={onClick?onClick:undefined}>{children}</h2>;
    } else if (level === 3) {
        return <h3 style={style} onClick={onClick?onClick:undefined}>{children}</h3>;
    } else if (level === 4) {
        return <h4 style={style} onClick={onClick?onClick:undefined}>{children}</h4>;
    } else if (level === 5) {
        return <h5 style={style} onClick={onClick?onClick:undefined}>{children}</h5>;
    } else {
        return <ErrorMessage color="warning">Неверно выбран уровень заголовка</ErrorMessage>;
    }
}