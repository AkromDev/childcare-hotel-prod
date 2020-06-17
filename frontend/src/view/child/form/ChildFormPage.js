import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ChildForm from 'view/child/form/ChildForm';
import { i18n } from 'i18n';

class ChildFormPage extends Component {
  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing()
      ? i18n('entities.child.edit.title')
      : i18n('entities.child.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.child.menu'), '/child'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>

          <ChildForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(ChildFormPage);
