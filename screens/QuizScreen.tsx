import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courses } from '../data/courses';

export default function QuizScreen({ navigation, route }: any) {
  const { courseId } = route.params;
  const course = courses.find(c => c.id === courseId);

  if (!course) return null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = course.quizzes[currentQuestion];
  const isLast = currentQuestion === course.quizzes.length - 1;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setScore(s => s + 1);
    }
    setAnswers(prev => [...prev, index]);
  };

  const handleNext = () => {
    if (isLast) {
      // Quiz finished
    } else {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (isLast && showResult) {
    const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
    const percent = Math.round((finalScore / course.quizzes.length) * 100);
    let message = '';
    let emoji = '';
    if (percent >= 80) { message = 'Excellent travail !'; emoji = '🎉'; }
    else if (percent >= 50) { message = 'Bien joué !'; emoji = '👍'; }
    else { message = 'Continuez à apprendre !'; emoji = '💪'; }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>{emoji}</Text>
            <Text style={styles.resultTitle}>Quiz terminé !</Text>
            <Text style={styles.resultMessage}>{message}</Text>

            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercent}>{percent}%</Text>
              <Text style={styles.scoreDetail}>
                {finalScore} / {course.quizzes.length} correctes
              </Text>
            </View>

            <View style={styles.resultBreakdown}>
              {course.quizzes.map((q, idx) => {
                const ans = idx === currentQuestion ? selectedAnswer : answers[idx];
                const isCorrect = ans === q.correctAnswer;
                return (
                  <View key={q.id} style={styles.breakdownRow}>
                    <View style={[styles.breakdownDot, { backgroundColor: isCorrect ? '#10B981' : '#EF4444' }]}>
                      <Ionicons name={isCorrect ? 'checkmark' : 'close'} size={14} color="#FFF" />
                    </View>
                    <Text style={styles.breakdownText} numberOfLines={1}>{q.question}</Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.resultButton, { backgroundColor: course.color }]}
              onPress={handleRestart}
            >
              <Ionicons name="refresh" size={20} color="#FFF" />
              <Text style={styles.resultButtonText}>Recommencer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButtonStyle}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Retour au cours</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${((currentQuestion + (showResult ? 1 : 0)) / course.quizzes.length) * 100}%`, backgroundColor: course.color }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {course.quizzes.length}
        </Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <View style={[styles.questionBadge, { backgroundColor: course.color + '18' }]}>
            <Text style={[styles.questionBadgeText, { color: course.color }]}>Question {currentQuestion + 1}</Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            let optionStyle = styles.option;
            let textStyle = styles.optionText;

            if (showResult) {
              if (index === question.correctAnswer) {
                optionStyle = { ...styles.option, ...styles.optionCorrect };
                textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
              } else if (index === selectedAnswer) {
                optionStyle = { ...styles.option, ...styles.optionWrong };
                textStyle = { ...styles.optionText, ...styles.optionTextWrong };
              } else {
                optionStyle = { ...styles.option, opacity: 0.6 };
              }
            } else if (selectedAnswer === index) {
              optionStyle = { ...styles.option, ...styles.optionSelected, borderColor: course.color };
              textStyle = { ...styles.optionText, color: course.color };
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleSelect(index)}
                disabled={showResult}
                activeOpacity={0.7}
              >
                <View style={styles.optionLetter}>
                  <Text style={[styles.letterText, selectedAnswer === index && !showResult && { color: course.color }]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={textStyle}>{option}</Text>
                {showResult && index === question.correctAnswer && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <Ionicons name="close-circle" size={24} color="#EF4444" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: course.color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {isLast ? 'Voir les résultats' : 'Question suivante'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 45,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  questionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  questionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  optionSelected: {
    backgroundColor: '#F5F3FF',
    borderWidth: 2,
  },
  optionCorrect: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  optionWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
  optionTextCorrect: {
    color: '#059669',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#DC2626',
    fontWeight: '600',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  nextButton: {
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpace: {
    height: 40,
  },
  resultContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  resultEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  resultMessage: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#C7D2FE',
  },
  scorePercent: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6366F1',
  },
  scoreDetail: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  resultBreakdown: {
    width: '100%',
    marginBottom: 24,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  breakdownDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  breakdownText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  resultButton: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  resultButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backButtonStyle: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
});
