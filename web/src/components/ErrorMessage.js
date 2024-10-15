import TextNormal from './TextNormal';

export default function ErrorMessage({ children }) {
    return (
    <TextNormal color="warning">Error: {children}</TextNormal>
    );
}