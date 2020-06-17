import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ChildView from 'view/child/view/ChildView';
import { i18n } from 'i18n';
import actions from 'modules/child/view/childViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/child/view/childViewSelectors';
import ChildViewToolbar from 'view/child/view/ChildViewToolbar';

class ChildPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.child.menu'), '/child'],
            [i18n('entities.child.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.child.view.title')}
          </PageTitle>

          <ChildViewToolbar match={this.props.match} />

          <ChildView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(Layout(ChildPage));
