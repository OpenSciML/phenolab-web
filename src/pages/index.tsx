import type {CSSProperties, ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const platformFeatures = [
  {
    title: 'Research workspace',
    body: 'Organize projects, studies, datasets, plots, field observations, imagery, metadata, treatments, and supporting files.',
    to: '/docs/features/projects',
  },
  {
    title: 'Reusable LgoPy pipelines',
    body: 'Bring scientists, developers, precision agriculture specialists, and remote-sensing experts together to create and share reusable analytical modules and algorithms for reproducible, scalable, high-throughput phenotyping workflows.',
    to: '/docs/features/analysis-pipelines',
  },
  {
    title: 'Scientific knowledge base',
    body: 'Keep datasets, features, figures, tables, models, statistics, methods, provenance, and literature connected.',
    to: '/docs/#software-architecture',
  },
  {
    title: 'PhenoLab Agent',
    body: 'Use scientific context to help process, analyze, and interpret data for discovery, downstream analysis, manuscripts, and proposals.',
    to: '/docs/#software-architecture',
  },
];

export default function Home(): ReactNode {
  const logoSrc = useBaseUrl('/img/phenolab-logo.png');
  const heroStyle = {
    '--phenolab-hero-image': `url("${useBaseUrl('/img/phenolab-hero-banner.png')}")`,
  } as CSSProperties;

  return (
    <Layout
      title="PhenoLab"
      description="PhenoLab documentation for crop phenotyping studies, imagery, pipelines, and deployment.">
      <main>
        <section className={styles.hero} style={heroStyle}>
          <div className={styles.heroText}>
            <img
              className={styles.logo}
              src={logoSrc}
              alt="PhenoLab logo"
            />
            <Heading as="h1" className={styles.title}>
              PhenoLab
            </Heading>
            <p className={styles.subtitle}>
              An agentic-first crop phenotyping platform that turns multi-sensor agricultural data into a searchable scientific knowledge base using modular, AI-powered analysis pipelines and intelligent agents that help researchers analyze data, uncover insights, and accelerate discovery.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Get Started
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/">
                Software Overview
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.workflowHeader}>
            <Heading as="h2">Platform Features</Heading>
            <p>
              High-level components for moving from field data to reusable analysis,
              scientific interpretation, and research outputs.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {platformFeatures.map((feature) => (
              <Link className={styles.workflowCard} to={feature.to} key={feature.title}>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
