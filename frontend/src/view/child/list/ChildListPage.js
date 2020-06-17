import React, { Component } from 'react';
import ChildListFilter from 'view/child/list/ChildListFilter';
import ChildListTable from 'view/child/list/ChildListTable';
import ChildListToolbar from 'view/child/list/ChildListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class ChildListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.child.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.child.list.title')}
          </PageTitle>

          <ChildListToolbar />
          <ChildListFilter />
          <ChildListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(ChildListPage);
