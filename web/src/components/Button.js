import ErrorMessage from './ErrorMessage';

export default function Button({children, disabled = false, color = "primary", onclick}) {
    let className = color === "primary" ? "btn-primary" 
        : color === "secondary" ? "btn-secondary" 
        : color === "warning" ? "btn-warning"
        : undefined;

    if (className) {
        return (
            <button class={className} disabled={disabled ?? false} onClick={onclick}>{children}</button>
        )
    } else {
        return <ErrorMessage>Недопустимый цвет кнопки</ErrorMessage>
    }
}

