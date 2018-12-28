import React, {Component} from 'react'
import './search.css'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'
import {connect} from 'react-redux'

class Search extends Component {
  render() {
    return (
      <div id='search'>
        <Header field={{title: '发现', path: '/search'}}/>
        <div>
          <div className='items-wrap'>
            <div className='user-item'>
              <div className='icon-wrap'>
                <span className='shoucang'>
                  <img src='./image/pyq.svg' alt=''/>
                </span>
              </div>
              <div className='textWrap'>朋友圈</div>
              <div className='arrow'>
                <span className='iconfont icon-arrow-right'/>
              </div>
            </div>
          </div>
          <div className='items-wrap'>
            <div className='user-item'>
              <div className='icon-wrap'>
                <span style={{ fontSize: '.2rem' }} className='iconfont icon-saoyisao'/>
              </div>
              <div className='textWrap'>扫一扫</div>
              <div className='arrow'>
                <span className='iconfont icon-arrow-right'/>
              </div>
            </div>
            <div className='user-item'>
              <div className='icon-wrap'>
                <span style={{ fontSize: '.2rem' }} className='iconfont icon-yaoyiyao'/>
              </div>
              <div className='textWrap'>摇一摇</div>
              <div className='arrow'>
                <span className='iconfont icon-arrow-right'/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    zone: state
  }
}
export default connect(mapStateToProps)(Search)
