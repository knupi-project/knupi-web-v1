function About() {
  return (
    <div className="about">
      <div className="about_title">🎹 About KNUPI</div>

      <div className="about_main">
        <img
          className="about_logo_duck"
          src={process.env.PUBLIC_URL + '/img/logo_duck.jpeg'}
          alt="img"
        />
        <div className="about_main_explain">
          <b>KNUPI</b>는 2022년에 설립되었으며 피아노 음악과 연주를 사랑하는
          사람들이 모여있는 경북대학교 중앙 동아리입니다.
          <br />
          <br />
          <b>KNUPI</b>는 피아노를 통한 동아리원들 간의 소통, 협력을 통한 연주
          실력 향상, 연주경험을 통한 자신감 획득을 목표로 하고 있습니다.
          <br />
          <br />
          <b>KNUPI</b>는 매 학기 가두모집 기간에 신규 부원을 모집합니다.
        </div>

        <div className="about_article">
          <div className="about_article_title">🎹 Program</div>
          <div className="about_article_sub_title">1. 멘토링</div>
          <div className="about_article_main">
            각 동아리원의 구체적인 실력향상을 위해 동아리원 간의 멘토링을
            진행합니다. <br />
            멘티가 되길 희망하는 동아리원들은 음악적 취향이 비슷한 멘토를 매칭
            받을 수 있으며,
            <br /> 멘토 - 멘티 간의 일정 조율 및 곡선정을 통해 비교적 자유롭게
            연습을 진행할 수 있습니다.
          </div>
          <div className="about_article_sub_title">2. 정기 모임</div>
          <div className="about_article_main">
            정기적으로 전 동아리원 모임을 갖고 OT 및 간담회, 피아노 친목회, 종강
            총회 등을 진행합니다.
          </div>
          <div className="about_article_sub_title">3. 공연 관람</div>
          <div className="about_article_main">
            대구 인근 공연장에서 열리는 전문 연주자들의 공연을 동아리원들과 함께
            관람합니다.
          </div>
          <div className="about_article_sub_title">4. 정기 연주회</div>
          <div className="about_article_main">
            각 동아리원이 한 학기 간 연습한 곡을 다른 동아리원 앞에서 발표하는
            내부 연주회입니다.
          </div>
          <div className="about_article_sub_title">5. 재능 기부 봉사활동</div>
          <div className="about_article_main">
            음악을 통해 많은 이들과 공감하고, 이들에게 위로를 전할 수 있는
            크누피가 되고 싶습니다.
          </div>
        </div>

      </div>
    </div>
  );
}
export default About;
