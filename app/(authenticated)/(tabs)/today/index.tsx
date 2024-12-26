import { RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fab from '@/components/Fab'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { projects, todos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns';
import { Todo } from '@/types/interfaces'
import Animated, { LayoutAnimationConfig, StretchInY } from 'react-native-reanimated'
import TaskRow from '@/components/TaskRow'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

interface Section {
  title: string;
  data: Todo[];
}

const Today = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sectionListData, setSectionListData] = useState<Section[]>([]);
  const { top } = useSafeAreaInsets();
  const db = useSQLiteContext()
  const drizzleDb = drizzle(db)
  const { data } = useLiveQuery(drizzleDb.select()
    .from(todos)
    .leftJoin(projects, eq(todos.project_id, projects.id))
    .where(eq(todos.completed, 1)))

  useEffect(() => {
    const formatedData = data?.map((item) => ({
      ...item.todos,
      project_name: item.projects?.name,
      project_color: item.projects?.color,
    }));


    const groupedByDay = formatedData?.reduce((acc: { [key: string]: Todo[] }, task) => {
      const day = format(new Date(task.due_date || new Date()), 'd MMM · eee');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});

    // Convert grouped data to sections array
    const listData: Section[] = Object.entries(groupedByDay || {}).map(([day, tasks]) => ({
      title: day,
      data: tasks,
    }));

    // Sort sections by date
    listData.sort((a, b) => {
      const dateA = new Date(a.data[0].due_date || new Date());
      const dateB = new Date(b.data[0].due_date || new Date());
      return dateA.getTime() - dateB.getTime();
    });

    setSectionListData(listData);
  }, [data])

  return (
    <View style={[styles.container, { paddingTop: top - 36 }]}>
      <SectionList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionListData}
        renderItem={({item})=> <TaskRow task={item}/>}
        // renderItem={({ item }) => (
        //   <LayoutAnimationConfig>
        //     <Animated.View entering={StretchInY}>
        //       <TaskRow task={item} />
        //     </Animated.View>
        //   </LayoutAnimationConfig>
        // )}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.title}</Text>;
        }}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />

      <Fab />
    </View>
  )
}

export default Today

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
});