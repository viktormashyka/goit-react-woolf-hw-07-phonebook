import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Тут ви можете логувати помилку або виконувати інші дії
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Щось пішло не так. Будь ласка, спробуйте знову.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
