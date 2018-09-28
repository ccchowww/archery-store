import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    bowItem: state.bowItem
})


export default connect(mapStateToProps, { getBowItems })(Home);