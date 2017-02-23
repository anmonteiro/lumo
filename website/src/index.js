/* eslint-disable max-len */

import React from 'react';
import Site from '../components/Site';
import Container from '../components/Container';
import HomeSplash from '../components/home/HomeSplash';
import GridBlock from '../components/home/GridBlock';
import siteConfig from '../siteConfig';

import { button } from '../components/Button.scss';

export default () => {
  const showcase = siteConfig.users
    .filter(user => user.pinned)
    .map(({ infoLink, image, caption }) =>
      <a href={infoLink} key={image}>
        <img src={image} title={caption} alt={caption} />
      </a>,
    );

  return (
    <Site>
      <HomeSplash />
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <GridBlock
            align="center"
            contents={[
              {
                image: '/img/content/rocket.png',
                imageAlign: 'top',
                title: 'Instant startup',
                content:
                  'Lumo starts up instantly, giving you access to a full-featured ClojureScript environment in less than 200 milliseconds.',
              },
              {
                image: '/img/content/cljslogo.svg',
                imageAlign: 'top',
                title: 'Clojure(Script)',
                content:
                  'Harness the full power of ClojureScript in a self-contained, cross-platform environment with no setup necessary.',
              },
              {
                image: '/img/content/nodejslogo.png',
                imageAlign: 'top',
                title: 'Instant Feedback',
                content:
                  'All the power of Node.js and seamless integration with more than 450 thousand NPM packages in a single binary.',
              },
            ]}
            layout="fourColumn"
          />
        </Container>
        <Container padding={['bottom', 'top']} background="light">
          <GridBlock
            contents={[
              {
                content:
                  'Jest parallelizes test runs across workers to maximize performance. Console messages are buffered and printed together with test results. Sandboxed test files and automatic global state resets for every test so no two tests conflict with each other.',
                image: '/img/content/feature-fast.png',
                imageAlign: 'right',
                title: 'Fast and sandboxed',
              },
            ]}
          />
        </Container>
        <Container padding={['bottom', 'top']}>
          <GridBlock
            contents={[
              {
                content:
                  'Easily create code coverage reports using `--coverage`. No additional setup or libraries needed! Jest can collect code coverage information from entire projects, including untested files.',
                image: '/img/content/feature-coverage.png',
                imageAlign: 'left',
                title: 'Built-in code coverage reports',
              },
            ]}
          />
        </Container>
        <Container padding={['bottom', 'top']} background="light">
          <GridBlock
            contents={[
              {
                content:
                  'Jest is already configured when you use [`create-react-app`](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html) or [`react-native init`](http://facebook.github.io/react-native/docs/getting-started.html) to create your React and React Native projects. Place your tests in a `__tests__` folder, or name your test files with a `.spec.js` or `.test.js` extension. Whatever you prefer, Jest will find and run your tests.',
                image: '/img/content/feature-config-react.png',
                imageAlign: 'right',
                title: 'Zero configuration',
              },
            ]}
          />
        </Container>

        <Container padding={['bottom', 'top']}>
          <GridBlock
            contents={[
              {
                content:
                  'Powerful [mocking library](/docs/mock-functions.html) for functions and modules. Mock React Native components using `jest-react-native`.',
                image: '/img/content/feature-mocking.png',
                imageAlign: 'left',
                title: 'Powerful mocking library',
              },
            ]}
          />
        </Container>
        <Container padding={['bottom', 'top']} background="light">
          <GridBlock
            contents={[
              {
                content:
                  'Jest works with any compile-to-JavaScript language and integrates seamlessly with [Babel](https://babeljs.io) and with TypeScript through [ts-jest](https://github.com/kulshekhar/ts-jest).',
                image: '/img/content/feature-typescript.png',
                imageAlign: 'right',
                title: 'Works with TypeScript',
              },
            ]}
          />
        </Container>

        <div className="productShowcaseSection paddingBottom">
          <h2>Who's using Jest?</h2>
          <p>
            Jest is used by teams of all sizes to test web application, node.js
            services, mobile apps, and APIs.
          </p>
          <div className="logos">
            {showcase}
          </div>
          <div className="more-users">
            <a className={button} href="/users.html" target="_self">
              More Jest Users
            </a>
          </div>
        </div>
      </div>
    </Site>
  );
};
