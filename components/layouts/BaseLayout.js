import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {
  const { className, children, isAuthenticated, user, isSiteOwner, cannonical } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'Ali Emili Portfolio';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="My name is Ali Emili and I am an experienced software engineer and freelance developer. I have a Bachelor's degree in Computer Engineering and several years of experience working on a wide range of technologies and projects from C++ development  to modern mobile and web applications in React, Vue and Node. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience." />
        <meta name="keywords" content="Emili portfolio, Emili developer, Emili freelancig, Emili programming"/>
        <meta property="og:title" content="Ali Emili - programmer, developer, bloger" />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="My name is Ali Emili and I am an experienced software engineer and freelance developer."/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>
        {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}
        <link rel="icon" type="image/ico" href="/static/favicon.ico"/>
      </Head>
      <div className="layout-container" >
        <Header className={`port-nav-${headerType}`}
                isAuthenticated={isAuthenticated}
                user={user}
                isSiteOwner={isSiteOwner}/>
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;

