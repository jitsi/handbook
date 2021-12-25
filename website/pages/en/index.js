/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="left"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Intro = () => (
      <Block>
        {[
          {
            content:
              'Jitsi Meet is a set of Open Source projects which empower users to deploy ' +
              'secure, scalable and easy to use video conferencing platforms with ' +
              'state-of-the-art video quality and features.' +
              '<br/><br/>' +
              'On This site you\'ll find documentation for all your Jitsi needs.' +
              '<br /><br/>' +
              'Get started <a href="https://jitsi.github.io/handbook/docs/intro">here</a>.'
              ,
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Hey there Fellow Jitster!',
          },
        ]}
      </Block>
    );

    const Middle = () => (
      <Block>
        {[
          {
            content:
              'Jitsi Meet supports all common browsers and also mobile devices.' +
              '<br /><br />' +
              'Our APIs allow developers to easily integrate Jitsi Meet into existing ' +
              'applications, whether those are web based or native mobile apps.' +
              '<br /><br />' +
              'You can use our freely available instance at <a href="https://meet.jit.si" target="_blank">meet.jit.si</a> ' +
              'or self-host it yourself using our readily available Debian packages or comprehensive Docker setup.'
              ,
            image: `${baseUrl}img/undraw_real_time_sync.svg`,
            imageAlign: 'right',
            title: 'Batteries included',
          },
        ]}
      </Block>
    );

    const JaaS = () => (
      <Block>
        {[
          {
            content:
              'Looking for configuration flexibility without the complexity of self-hosting '+
              ' and scalability management?' +
              '<br /><br />' +
              'Look no further than JaaS. 8x8 Jitsi as a Service (JaaS) is an enterprise-ready ' +
              'video meeting platform that allows developers, organizations and businesses to ' +
              'easily build and deploy video solutions. With Jitsi as a Service we now give you ' +
              'all the power of Jitsi running on our global platform so you can focus on building ' +
              'secure and branded video experiences.' +
              '<br /><br />' +
              'Check JaaS out <a href="https://jaas.8x8.vc" target="_blank">here</a>.'
              ,
            image: `${baseUrl}img/undraw_going_up.svg`,
            imageAlign: 'left',
            title: 'JaaS: Jitsi as a Service',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Intro />
          <Middle />
          <JaaS />
        </div>
      </div>
    );
  }
}

module.exports = Index;
