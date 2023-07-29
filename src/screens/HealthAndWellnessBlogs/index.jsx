import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { IconButton, Card, Button, Surface, Text, useTheme, Appbar, Searchbar } from 'react-native-paper'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import hoc from '../../components/HOC'
import blogs from '../../utils/blogs'
import styles from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HealthWellnessBlogsScreen = ({ hideOption = false }) => {
    const [selectedBlogUrl, setSelectedBlogUrl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const navigation = useNavigation();

    useEffect(() => {
        loadBlogs();
    }, []);

    useEffect(() => {
        const filtered = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [searchQuery]);


    const loadBlogs = async () => {
        const jsonValue = await AsyncStorage.getItem('blogs');
        if (jsonValue === null) {
            try {
                const initialBlogs = JSON.stringify(blogs);
                await AsyncStorage.setItem('blogs', initialBlogs);
            } catch (error) {
                console.error('Error saving initial blogs data', error);
            }
        }
    };

    const handleOpenBlog = (url) => {
        setSelectedBlogUrl(url);
    };

    const handleCloseBlog = () => {
        setSelectedBlogUrl(null);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const renderItem = ({ item }) => {
        return (
            <Card style={styles.card}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>
                        {item.title}
                    </Text>
                    <IconButton icon="open-in-new" onPress={() => handleOpenBlog(item.url)} />
                </View>
            </Card>
        );
    };

    return (
        <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }}>
            {selectedBlogUrl ? (
                <View style={{ flex: 1 }}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={handleCloseBlog}>
                            <MaterialCommunityIcons name="arrow-left" size={30} color="#4e32bc" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 16 }}>
                            Back to Blogs List
                        </Text>
                    </View>
                    <WebView source={{ uri: selectedBlogUrl }} />
                </View>
            ) : (
                <View>
                    <View style={styles.headerMain}>
                        <View>
                            {!hideOption &&
                                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                                    <MaterialCommunityIcons name="menu" size={28} color="black" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.header}>
                            <Text variant="headlineLarge" style={styles.name}>Fitness Blogs</Text>
                        </View>
                    </View>
                    <Searchbar
                        placeholder="Search blogs"
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                    <FlatList
                        style={{ marginTop: 15, marginBottom: 140, paddingBottom: 15 }}
                        data={filteredBlogs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </View>
            )}
        </View>
    );
};

export default hoc(HealthWellnessBlogsScreen);
