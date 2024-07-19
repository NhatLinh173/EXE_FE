import React, { useState } from "react";
import img from "../assets/img/R2.png";
import "../assets/css/AboutCss.css";

const About = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={img} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Chúng Tôi</h2>
              <p>
                Câu chuyện và cảm hứng hình thành doanh nghiệp: Mỗi ngày, khi
                lựa chọn những thực phẩm để sử dụng trong bữa ăn của gia đình.
                Tôi luôn lo lắng và đắng đo về chất lượng của những thực phẩm
                rau, củ, quả ấy. Sỡ dĩ ngoài chất lượng, tôi còn cân đo về giá
                thành của rau củ. Bởi, nếu có đắt tiền một chút, nhưng mà từ
                nguồn cung cấp an toàn thì tôi vẫn yên tâm hơn. Mọi cân nhắc ấy,
                vô tình đã làm tôi nhớ đến hương vị ngọt ngào của quê hương.
                Tuổi thơ gắn liền với ký ức về những cánh đồng bao la và những
                vựa rau xanh mướt mà tôi cùng mẹ chăm sóc mỗi ngày để gia đình
                được ăn rau sạch. Nhớ những bữa ăn đầy đủ dinh dưỡng mà bà nấu,
                với những loại rau chỉ có ở làng quê. Những thứ ấy không chỉ là
                nguồn cung cấp dinh dưỡng mà còn là dấu ấn về tình yêu và sự
                quan tâm, yêu thương từ gia đình.{" "}
                {expanded && (
                  <>
                    <p>
                      "Nhớ về ba tôi, một người nông dân hiền lành, luôn dành
                      toàn bộ tâm huyết và sức lực để trồng trọt, chăm sóc những
                      cây trái và rau củ kể cả ngày mưa dầm nắng. Chỉ mong sao
                      cho chúng phát triển mạnh mẽ mang về những khoản thu để
                      nuôi sống gia đình. Nổi trằn trọc của ba là những ngày mùa
                      vụ có tốt đến mấy. Nhưng bà con nông dân không bán được,
                      không ai muốn sử dụng vì quá nhiều nhà trồng được. Xa nhà,
                      nghe được nổi lòng của ba, của người nông dân đã dành hết
                      công sức và tâm huyết trở nên vô ích. Những đứa trẻ chúng
                      tôi, chỉ muốn được ủng hộ quê nhà mình bằng mọi cách."
                    </p>
                    <p>
                      "Với tôi, ở thành phố, việc tìm kiếm và giữ gìn hương vị
                      rau sạch từ quê nhà trở nên quan trọng hơn bao giờ hết.
                      Mỗi bước chân đi chợ là một cuộc hành trình tìm kiếm,
                      không chỉ để đảm bảo sức khỏe cho gia đình, mà còn là cuộc
                      đấu tranh để tìm ra nguồn thực phẩm an toàn để sử dụng."
                    </p>
                    <p>
                      "Nhìn thấy những sinh viên, công nhân mang theo những gói
                      quà từ quê nhà, tôi cũng ước ao được nhận những món quà
                      tinh thần đó, không chỉ vì những món đồ vật giản dị mà còn
                      vì chúng là biểu tượng của tình thương và sự quan tâm từ
                      người thân yêu. Mỗi bó rau, mỗi trái bí, mỗi trái bầu
                      không chỉ là thực phẩm, mà còn là một phần của trái tim
                      quê hương, đem lại cho tôi cảm giác ấm áp và an ủi giữa
                      cuộc sống hối hả của thành phố."
                    </p>
                  </>
                )}
                <button onClick={toggleExpand} className="load-more">
                  {expanded ? "Rút gọn" : "Xem thêm"}
                </button>
              </p>
              <h3>Tại Sao Chọn Chúng Tôi?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Sản phẩm chất lượng</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Dịch vụ chuyên nghiệp</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Giao hàng nhanh chóng và đảm bảo</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Sự đa dạng và linh hoạt</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>&#10003; Bảo vệ môi trường và phát triển bền vững</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
