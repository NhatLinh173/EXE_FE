import "../assets/css/ServiceCss.css";

export const Service = () => {
  return (
    <div id="services" className="text-center" style={{ padding: "150px" }}>
      <div className="container-service">
        <div className="section-title">
          <h2>Dịch Vụ Của Chúng Tôi</h2>
        </div>
        <div className="row">
          <div className="col-md-3 crirl-info">
            <h3>Giao hàng tận nhà</h3>
            <p>
              Khách hàng có thể đặt rau trên website của chúng tôi và sẽ được
              nhận rau trong khoảng thời gian ngắn nhất{" "}
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Dịch Vụ Chuyên Nghiệp</h3>
            <p>
              Chúng tôi đặt sự chuyên nghiệp lên hàng đầu đề phục vụ những điều
              tốt nhất đến với khách hàng{" "}
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Tư vấn - Chăm sóc khách hàng </h3>
            <p>
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn khách hàng trong bất kỳ
              khoản thời gian nào mà khách hàng cần chúng tôi
            </p>
          </div>
          <div className="col-md-3 crirl-info">
            <h3>Tư Vấn Dinh Dưỡng</h3>
            <p>
              Chúng tôi có thể tư vấn khách hàng về vấn đề dinh dưỡng và các
              chất lượng của các loại rau làm sau để tốt nhất đối với khách hàng{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
