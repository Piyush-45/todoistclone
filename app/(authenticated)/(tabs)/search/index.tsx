import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { todos, projects } from '@/db/schema';
import { useSQLiteContext } from 'expo-sqlite';
import { like } from 'drizzle-orm';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
const SearchScreen = () => {
const HeaderHeight = useHeaderHeight
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<{ type: string; data: any[] }[]>([]);

  const sqliteDb = useSQLiteContext();
  const drizzleDb = drizzle(sqliteDb);

  useEffect(() => {
    // Debounced search effect
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(timeoutId); // Cleanup timeout on searchQuery change
  }, [searchQuery]);

  const fetchResults = async () => {
    try {
      const todosResults = await drizzleDb
        .select()
        .from(todos)
        .where(like(todos.name, `%${searchQuery}%`))
        .all();

      const projectsResults = await drizzleDb
        .select()
        .from(projects)
        .where(like(projects.name, `%${searchQuery}%`))
        .all();

      setResults([
        { type: 'Projects', data: projectsResults },
        { type: 'Todos', data: todosResults },
      ]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const renderSection = ({ type, data }: { type: string; data: any[] }) => {
    if (!data.length) return null;

    return (
      <View style={[styles.section, ]}>
        <Text style={styles.sectionTitle}>{type}</Text>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.resultItem}>
            <Ionicons
              name={type === 'Projects' ? 'folder' : 'checkbox'}
              size={20}
              color={Colors.primary}
              style={styles.icon}
            />
            <Text style={styles.resultText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.lightText} />
        <TextInput
          style={styles.input}
          placeholder="Search tasks or projects"
          value={searchQuery}
          onChangeText={setSearchQuery} // Directly update local state
        />
      </View>

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => renderSection(item)}
        ListEmptyComponent={
          searchQuery.trim() ? (
            <Text style={styles.emptyText}>No results found</Text>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'skyblue',
    tintColor: Colors.primary,
    backgroundColor:Colors.backgroundAlt,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    marginTop: 160
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
  },
  section: {
    flex: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  resultText: {
    fontSize: 16,
    color: 'black',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.lightText,
    marginTop: 32,
  },
});
