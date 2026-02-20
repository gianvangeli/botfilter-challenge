type Props = {
    variant: "info" | "error" | "success";
    title: string;
    description?: string;
};

export function StatusBanner({ variant, title, description }: Props ) {
    return (
        <div className={`banner banner--${variant}`} role="status">
            <div className="banner_title">{title}</div>
            {description ? <div className="banner_desc">{description}</div> : null}
        </div>
    );
}