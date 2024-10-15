export default function Subcaption({ children, level = 1, color }) {
    let style = {color: color ? `var(--${color})` : undefined }
    
    return (
    <h6 className={"subcaption-" + level} style={style}>{children}</h6>
    );
}