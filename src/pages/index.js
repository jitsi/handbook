import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

const features = [
  {
    title: <Translate>Hey there Fellow Jitster!</Translate>,
    imageUrl: 'img/undraw_code_review.svg',
    description: (
      <>
        <Translate>
          Jitsi Meet is a set of Open Source projects which empower users to
          deploy secure, scalable and easy to use video conferencing platforms
          with state-of-the-art video quality and features.
        </Translate>
        <br />
        <br />
        <Translate>
          On This site you'll find documentation for all your Jitsi needs.
        </Translate>
        <br />
        <br />
        <Translate>Get started</Translate>
        <a href="docs/intro">
          {' '}
          <Translate>here.</Translate>
        </a>
      </>
    ),
  },
  {
    title: <>Batteries included</>,
    imageUrl: 'img/undraw_real_time_sync.svg',
    description: (
      <>
        <Translate>
          Jitsi Meet supports all common browsers and also mobile devices.
        </Translate>
        <br />
        <br />
        <Translate>
          Our APIs allow developers to easily integrate Jitsi Meet into existing
          applications, whether those are web based or native mobile apps.
        </Translate>
        <br />
        <br />
        <Translate>You can use our freely available instance at</Translate>{' '}
        <a href="https://meet.jit.si" target="_blank">
          <Translate>meet.jit.si</Translate>
        </a>{' '}
        <Translate>
          or self-host it yourself using our readily available Debian packages
          or comprehensive Docker setup.
        </Translate>
      </>
    ),
  },
  {
    title: <>JaaS: Jitsi as a Service</>,
    imageUrl: 'img/undraw_going_up.svg',
    description: (
      <>
        <Translate>
          Looking for configuration flexibility without the complexity of
          self-hosting and scalability management?
        </Translate>
        <br />
        <br />
        <Translate>
          Look no further than JaaS. 8x8 Jitsi as a Service (JaaS) is an
          enterprise-ready video meeting platform that allows developers,
          organizations and businesses to easily build and deploy video
          solutions. With Jitsi as a Service we now give you all the power of
          Jitsi running on our global platform so you can focus on building
          secure and branded video experiences.
        </Translate>
        <br />
        <br />
        <Translate>Check JaaS out</Translate>{' '}
        <a href="https://jaas.8x8.vc" target="_blank">
          <Translate>here</Translate>
        </a>
        .
      </>
    ),
  },
];

function VideoContainer() {
  return (
    <div className="container text--center margin-bottom--xl margin-top--lg">
      <div className="row">
        <div className="col">
          <h2>
            <Translate>What is Jitsi?</Translate>
          </h2>
          <iframe
            src="https://www.youtube.com/embed/TB7LlM4erx8"
            title="What is Jitsi?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Jitsi Meet"
      description="State-of-the-art video conferencing you can self-host."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--secondary button--lg',
                styles.getStarted
              )}
              to={'docs/intro'}
            >
              <Translate>Get started!</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <VideoContainer />
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div key={idx} className={clsx('col col--4', styles.feature)}>
                    {imageUrl && (
                      <div className="text--center margin-bottom--lg">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
