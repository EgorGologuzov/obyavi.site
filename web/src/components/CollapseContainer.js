export default function CollapseContainer({ children, header }) {
    return (
        <div>
            <span class="text-small">{header}</span>
            <input type="checkbox" class="collapse-container-switch" /><br />
            <div className="collapse-container">
            {children}
            </div>
        </div>
    );
}