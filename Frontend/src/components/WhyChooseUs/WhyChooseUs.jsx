import "./WhyChooseUs.css";
import {
    FaShippingFast,
    FaLock,
    FaUndoAlt,
    FaHeadset,
} from "react-icons/fa";

const features = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Free Shipping",
        description: "Free delivery on all orders over $50.",
    },
    {
        id: 2,
        icon: <FaLock />,
        title: "Secure Payment",
        description: "100% secure payment with trusted gateways.",
    },
    {
        id: 3,
        icon: <FaUndoAlt />,
        title: "Easy Returns",
        description: "30-day easy return and refund policy.",
    },
    {
        id: 4,
        icon: <FaHeadset />,
        title: "24/7 Support",
        description: "Our support team is always ready to help.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="why-section">

            <div className="section-title">
                <h2>Why Shop With Us?</h2>
                <p>
                    We provide the best shopping experience with trusted service and
                    premium quality products.
                </p>
            </div>

            <div className="feature-grid">

                {features.map((feature) => (
                    <div className="feature-card" key={feature.id}>

                        <div className="feature-icon">
                            {feature.icon}
                        </div>

                        <h3>{feature.title}</h3>

                        <p>{feature.description}</p>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default WhyChooseUs;