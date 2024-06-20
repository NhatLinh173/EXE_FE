import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/img/RSL1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../assets/img/R2.png";
import { Link } from "react-router-dom";
import "../assets/css/HeaderCss.css";
import { faComment } from "@fortawesome/free-solid-svg-icons";
export const Header = (props) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(9);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showChatButton, setShowChatButton] = useState(true);

  console.log(products);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/");

      let filteredProducts = response.data;
      if (searchKeyword) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      setDisplayedProducts(
        filteredProducts.slice(0, numberOfDisplayedProducts)
      );

      setProducts(filteredProducts);

      if (filteredProducts.length > 0) {
        setDisplayedProducts(
          filteredProducts.slice(0, numberOfDisplayedProducts)
        );
        setNoResults(false);
      } else {
        setDisplayedProducts([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchKeyword]);

  const loadMoreProducts = () => {
    const newNumberOfDisplayedProducts = numberOfDisplayedProducts + 9;
    setNumberOfDisplayedProducts(newNumberOfDisplayedProducts);
    setDisplayedProducts(products.slice(0, newNumberOfDisplayedProducts));
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  return (
    <>
      <header id="header" style={{ marginTop: "22px" }}>
        <div className="intro">
          <div
            className="overlay"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1 style={{ fontSize: "42px", lineHeight: "1.2" }}>
                    {" "}
                    <span style={{ color: "#7FFF00" }}>Rau củ</span> từ quê
                    hương,
                    <br />
                    gửi <span style={{ color: "#7FFF00" }}>yêu thương</span> đến
                    thành phố.
                  </h1>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.2",
                      color: "#FFFFFF",
                    }}
                  >
                    Từ những rau củ mà đất quê sản sinh, chúng ta truyền đi
                    không chỉ là thực phẩm bổ dưỡng mà còn là những dòng yêu
                    thương tươi mới, lan tỏa từ vùng quê tới nhịp sống hối hả
                    của thành phố.
                  </span>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="services" className="text-center" style={{ padding: "100px" }}>
        <div className="container-service">
          <div className="section-title">
            <h2>Dịch Vụ Của Chúng Tôi</h2>
          </div>
          <div className="row">
            <div className="col-md-3">
              <h3>Giao hàng tận nhà</h3>
              <p>
                Khách hàng có thể đặt rau trên website của chúng tôi và sẽ được
                nhận rau trong khoảng thời gian ngắn nhất{" "}
              </p>
            </div>
            <div className="col-md-3">
              <h3>Dịch Vụ Chuyên Nghiệp</h3>
              <p>
                Chúng tôi đặt sự chuyên nghiệp lên hàng đầu đề phục vụ những
                điều tốt nhất đến với khách hàng{" "}
              </p>
            </div>
            <div className="col-md-3">
              <h3>Tư vấn - Chăm sóc khách hàng </h3>
              <p>
                Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn khách hàng trong bất kỳ
                khoản thời gian nào mà khách hàng cần chúng tôi
              </p>
            </div>
            <div className="col-md-3">
              <h3>Tư Vấn Dinh Dưỡng</h3>
              <p>
                Chúng tôi có thể tư vấn khách hàng về vấn đề dinh dưỡng và các
                chất lượng của các loại rau làm sau để tốt nhất đối với khách
                hàng{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
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
                  nguồn cung cấp an toàn thì tôi vẫn yên tâm hơn. Mọi cân nhắc
                  ấy, vô tình đã làm tôi nhớ đến hương vị ngọt ngào của quê
                  hương. Tuổi thơ gắn liền với ký ức về những cánh đồng bao la
                  và những vựa rau xanh mướt mà tôi cùng mẹ chăm sóc mỗi ngày để
                  gia đình được ăn rau sạch. Nhớ những bữa ăn đầy đủ dinh dưỡng
                  mà bà nấu, với những loại rau chỉ có ở làng quê. Những thứ ấy
                  không chỉ là nguồn cung cấp dinh dưỡng mà còn là dấu ấn về
                  tình yêu và sự quan tâm, yêu thương từ gia đình.{" "}
                  {expanded && (
                    <>
                      <p>
                        "Nhớ về ba tôi, một người nông dân hiền lành, luôn dành
                        toàn bộ tâm huyết và sức lực để trồng trọt, chăm sóc
                        những cây trái và rau củ kể cả ngày mưa dầm nắng. Chỉ
                        mong sao cho chúng phát triển mạnh mẽ mang về những
                        khoản thu để nuôi sống gia đình. Nổi trằn trọc của ba là
                        những ngày mùa vụ có tốt đến mấy. Nhưng bà con nông dân
                        không bán được, không ai muốn sử dụng vì quá nhiều nhà
                        trồng được. Xa nhà, nghe được nổi lòng của ba, của người
                        nông dân đã dành hết công sức và tâm huyết trở nên vô
                        ích. Những đứa trẻ chúng tôi, chỉ muốn được ủng hộ quê
                        nhà mình bằng mọi cách."
                      </p>
                      <p>
                        "Với tôi, ở thành phố, việc tìm kiếm và giữ gìn hương vị
                        rau sạch từ quê nhà trở nên quan trọng hơn bao giờ hết.
                        Mỗi bước chân đi chợ là một cuộc hành trình tìm kiếm,
                        không chỉ để đảm bảo sức khỏe cho gia đình, mà còn là
                        cuộc đấu tranh để tìm ra nguồn thực phẩm an toàn để sử
                        dụng."
                      </p>
                      <p>
                        "Nhìn thấy những sinh viên, công nhân mang theo những
                        gói quà từ quê nhà, tôi cũng ước ao được nhận những món
                        quà tinh thần đó, không chỉ vì những món đồ vật giản dị
                        mà còn vì chúng là biểu tượng của tình thương và sự quan
                        tâm từ người thân yêu. Mỗi bó rau, mỗi trái bí, mỗi trái
                        bầu không chỉ là thực phẩm, mà còn là một phần của trái
                        tim quê hương, đem lại cho tôi cảm giác ấm áp và an ủi
                        giữa cuộc sống hối hả của thành phố."
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
      <div id="category" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Danh Sách Sản Phẩm</h2>
            <p></p>
          </div>
          <div className="search-container">
            <input
              type="text"
              id="search-bar"
              value={searchKeyword}
              onChange={handleSearchInputChange}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button type="submit" id="search-button" onClick={fetchProduct}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          {noResults && (
            <div className="no-results">Không có sản phẩm phù hợp.</div>
          )}
          <div className="row">
            {displayedProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <Link to="/category" className="custom-link">
                  <div className="portfolio-items product-item">
                    <img src={product.image} alt="" />
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)} VND</p>
                    <p>{product.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {numberOfDisplayedProducts < products.length && (
            <div className="btn-load-more">
              <button onClick={loadMoreProducts} className="button-load-more">
                Xem Thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
