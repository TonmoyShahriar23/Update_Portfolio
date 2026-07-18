export default function AnimatedBackground() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />
            <div className="bg-orb bg-orb-4" />
            <div className="bg-grid" />
        </div>
    );
}
