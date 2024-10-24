const Logo = ({size='full',onClick}) => {
    let className=size=='full'?'logo-full':'logo';
    return (
        <div className={className}>
            <button className={className+'_button'} onClick={onClick}/>
        </div>
    );
}
 
export default Logo;