import "./css/ScrollTopButton.css";

function ScrollTopButton() {
    const handleScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    };

    return (
        <button className="up-btn" onClick={handleScrollToTop}>&lt;</button>
    );
}

export default ScrollTopButton;
