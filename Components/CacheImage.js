import { Image } from 'react-native'
import React from 'react'
import * as FileSystem from 'expo-file-system';

export default class CacheImage extends React.Component {

    state = {
        source: null
    }

    componentDidMount = async () => {
        const { uri } = this.props;
        var sh = require("shorthash")
        const name = sh.unique(uri)
        const path = `${FileSystem.cacheDirectory}${name}`
        const image = await FileSystem.getInfoAsync(path);
        if (image.exists) {
            this.setState({
                source: {
                    uri: image.uri
                }
            })
            return;
        }

        const newImage = await FileSystem.downloadAsync(uri, path);
        this.setState({
            source: {
                uri: newImage.uri,
            }
        })
    }

    render() {
        return (
            <>
            <Image style={this.props.style} source={this.state.source}/>
            </>
        )
    }
}