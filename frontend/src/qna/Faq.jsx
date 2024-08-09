const Faq =({faqs})=>{
  return(
    <div className="faqSection">
          {faqs.map((faq, index) => (
            <div key={index} className="faqItem">
              <div className="faqQuestion">
                Q. {faq.faq_title}
              </div>
              <div className="faqAnswer">
                A. {faq.faq_content.split('\\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
  );
};
export default Faq;