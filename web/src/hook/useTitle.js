import { useEffect } from 'react';

export default function useTitle(text, defaultText = "объяви.site") {
    useEffect(() => {
        document.title = text;

        return () => {
            document.title = defaultText;
        }
    }, []);
}