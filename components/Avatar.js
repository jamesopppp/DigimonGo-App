import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    name: state.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: 'UPDATE_NAME',
        name: name,
      }),
  }
}

function Avatar(props) {
  const [photo, setPhoto] = useState(
    'https://p78.f0.n0.cdn.getcloudapp.com/items/xQuzwlJD/4d529cb0-2547-4d00-b7b5-ddf83e6e0d89.png?source=viewer&v=93988cb9ee7ccb1913a010e4206d271c'
  )

  useEffect(() => {
    fetch('https://randomuser.me/api/?nat=us')
      .then((response) => response.json())
      .then((response) => {
        let { results = [] } = response
        if (results.length > 0) {
          console.log(results[0])
          let {
            picture: { medium },
            name: { first, last },
          } = results[0]

          setPhoto(medium)

          props.updateName(`${first} ${last}`)
        } else {
          throw Error('randomuser get nothing!')
        }
      })
  }, [])

  return <Image source={{ uri: photo }} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`
