export default function ToolButton({ text, icon = "icon-picture", onclick }) {
    let img;
    let label;

    if (typeof icon === "string" && icon.startsWith("icon")) {
        img = <img className={icon} />
    } else {
        img = <img src={icon}/>
    }

    if (text) {
        label = <label>{text}</label>
    }

    return (
        <button class="btn-tool" onClick={onclick}>
            <div class="color-filter"></div>
            {img}
            {label}
        </button>
    )
}
