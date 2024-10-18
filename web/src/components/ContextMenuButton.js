export default function ContextMenuButton({ children, onClick }) {
    return (
        <button className="context-menu__btn" onClick={onClick}>{children}</button>
    )
}
