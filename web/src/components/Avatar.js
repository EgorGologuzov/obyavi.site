export default function Avatar({ src, onClick }) {
    return (
        <div className="avatar">
            {src && (
                <img className="avatar__img" src={src} onClick={onClick} />
            )}
            {!src && (
                <img className="avatar__img" style={{content: "var(--icon-avatar-placeholder)"}} onClick={onClick} />
            )}
        </div>
    )
}
