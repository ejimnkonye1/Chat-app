export const handleBackClick = (navigate, navigateBack, setNavigateBack) => {
    !navigateBack ? navigate('/chatbox') : null
    setNavigateBack(false)
}