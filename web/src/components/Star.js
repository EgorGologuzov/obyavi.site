const Star = ({className,onClick}) => {
    return (
        <svg width="52" height="57" viewBox="0 0 52 50">
            <path className={className} onClick={onClick} strokeDashoffset="4px" stroke="black" strokeLinecap="round" strokeWidth="2px" strokeDasharray="6 5" d="M18.3916 6.4164C20.7864 -0.954089 31.2136 -0.954083 33.6085 6.4164L34.0825 7.87539C35.1535 11.1716 38.2251 13.4033 41.691 13.4033H43.225C50.9748 13.4033 54.197 23.3202 47.9273 27.8754L46.6862 28.7771C43.8823 30.8142 42.7091 34.4252 43.78 37.7214L44.2541 39.1804C46.6489 46.5508 38.2131 52.6798 31.9434 48.1246L30.7023 47.2229C27.8984 45.1858 24.1016 45.1858 21.2977 47.2229L20.0566 48.1246C13.7869 52.6798 5.35108 46.5508 7.7459 39.1803L8.21995 37.7214C9.29095 34.4252 8.11768 30.8142 5.31378 28.7771L4.07269 27.8754C-2.19702 23.3202 1.02519 13.4033 8.77497 13.4033H10.309C13.7749 13.4033 16.8465 11.1716 17.9175 7.87539L18.3916 6.4164Z" fill="#7A7A7A"/>
        </svg>
    );
}

export default Star;