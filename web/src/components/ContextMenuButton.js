export default function ContextMenuButton({ children, onClick }) {
    const handleClick = (event) => {
        onClick(event);
        event.preventDefault();
    }

    return (
        <button className="context-menu__btn" onClick={handleClick}>{children}</button>
    )
}
