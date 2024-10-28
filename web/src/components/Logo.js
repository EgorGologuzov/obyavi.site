const Logo = ({sizeFull='full',onClick}) => {
    let className=sizeFull=='full'?'logo-full':'logo';
    return (
        <div className={className}>
            <button className={className+'_button'} onClick={onClick}/>
        </div>
    );
}
 
export default Logo;