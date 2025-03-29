function About() {
  return (
    <div className="about">
        <img
          className="about_logo_duck"
          src={process.env.PUBLIC_URL + '/img/logo_duck.jpeg'}
          alt="img"
        />
        
        <div className="about_article">
          <div className="about_article_title">크누피는 경북대학교</div>
          <div className="about_article_title">중앙 피아노 동아리입니다</div>
          
          <div className="about_article_main" style={{marginTop: '7em'}}>
          크누피는 2022년에 설립된 경북대학교 중앙 피아노 동아리로, <br />
          음악과 연주를 사랑하는 사람들이 모인 곳입니다. <br /> <br />

          피아노를 통해 서로 소통하고, <br />
          협력을 바탕으로 실력을 향상시키며, <br />
          연주 경험을 통해 자신감을 쌓아가고 있습니다. <br /><br />
          매 학기 가두모집 기간에 신규 부원을 모집하니, <br />
          관심 있는 사람은 언제든지 함께할 수 있습니다!
          </div>
        </div>

        <div className="about_article">
          <div className="about_article_title">Our Programs</div>
          <div className="about_article_sub_title">1. 멘토링</div>
          <div className="about_article_main">
            동아리원과의 멘토링! <br />
            멘토와 멘티가 되어 연주 실력을 길러볼까요?
          </div>
          
          <div className="about_article_sub_title">2. 정기 활동</div>
          <div className="about_article_main">
            환영회, 피크닉, 파티, MT, ... <br />
            동아리원들과 정기적으로 소통해요!
          </div>
          
          <div className="about_article_sub_title">3. 공연 관람</div>
          <div className="about_article_main">
            공연보러 같이 가실 분? <br />
            아름다운 공연을 동아리원들과 함께 관람해요!
          </div>
            
          <div className="about_article_sub_title">4. 정기 연주회</div>
          <div className="about_article_main">
            동아리원들이 열심히 준비한 연주를 함께 즐기는 시간! <br />
            아름다운 피아노 선율과 함께 마음을 녹여보세요!
          </div>
        </div>
      </div>
  );
}
export default About;
