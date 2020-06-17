import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/child/importer/childImporterSelectors';
import actions from 'modules/child/importer/childImporterActions';
import fields from 'modules/child/importer/childImporterFields';

class ChildImportPage extends Component {
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.child.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.child.menu'), '/child'],
            [i18n('entities.child.importer.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.child.importer.title')}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(ChildImportPage);
