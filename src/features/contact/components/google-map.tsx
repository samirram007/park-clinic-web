export default function GoogleMap() {
  return (
    <div className="w-full h-[450px] lg:h-full min-h-[450px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.001017646218!2d88.35050227435222!3d22.54163463410637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771786e63d47%3A0xf7d5796ba3ca3b61!2sPark%20Sonoscan%20Clinic!5e0!3m2!1sen!2sin!4v1777830543400!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Park Sonoscan Clinic Location"
      ></iframe>
    </div>
  );
}
