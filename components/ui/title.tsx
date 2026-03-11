
interface TitleProps {
    children: React.ReactNode;
}


export function Title({ children }: TitleProps) {
    return (
        <h1 className="text-koromiko-300 text-7xl font-bold font-title tracking-wider leading-tight">{children}</h1>
    )
}