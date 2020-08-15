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
              'On This site you\'ll find documentation for all your Jitsi needs. <br> ' +
              'NOTE: Some  of it is work in progress, hang tight!' +
              ' <br> <br> ' +
              'Take a look at: <a href="/handbook/docs/intro">Documentation - Overview</a> ',

            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Hey there Fellow Jitster!',
          },
        ]}
      </Block>
    );

    const Devices = () => (
      <Block>
        {[
          {
            content:
              'Jitsi Meet supports all common browsers and also mobile devices.',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'All platforms supported',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Intro />
          <Devices />
        </div>
      </div>
    );
  }
}

module.exports = Index;
