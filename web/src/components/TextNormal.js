export default function TextNormal({ children, color, fontSize = "normal" }) {
    let className;
    let style = {color: color ? `var(--${color})` : undefined }

    if (fontSize === "normal") {
        className = "text-normal";
    } else if (fontSize === "small") {
        className = "text-small";
    } else {
        className = "text-normal";
        style.fontSize = fontSize;
    }

    return (
        <p className={className} style={style}>{children}</p>
    );
}