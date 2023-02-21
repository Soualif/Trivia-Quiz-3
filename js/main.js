
// NAVIGATION ------------------------------------------------------------------

function navigate(direction) {
    // Parameter der aktuellen Seite
    let pathname = window.location.pathname;
    let questionNum = parseInt(getElementValue("questionNum", "0"));
    let lastQuestionIndex = parseInt(getElementValue("lastQuestionIndex", "-1"));

    // Berechne die Parameter für die Ziel-Seite
    let indexStep = getIndexStep(direction);
    let nextQuestionIndex = lastQuestionIndex + indexStep;
    let actionTarget;

    if (0 <= nextQuestionIndex && nextQuestionIndex < questionNum) {
        // Eine Frage ist die Zielseite.
        actionTarget = "question.php";
    }
    else if (nextQuestionIndex >= questionNum) {
        // Die Auswertung ist die Zielseite.
        actionTarget = "report.php";
    }
    else { // nextQuestionIndex < 0
        // Die Startseite ist die Zielseite.
        actionTarget = "index.php";
    }

    // alert(`pathname = ${pathname};\nquestionNum = ${questionNum};\nlastQuestionIndex = ${lastQuestionIndex};\nindexStep = ${indexStep};\nnextQuestionIndex = ${nextQuestionIndex};\nactionTarget = ${actionTarget}`);

    if (pathname === '/' || pathname.indexOf('/index.php') >= 0) {
        // index.php -----------------------------------------------------------
        setActionTarget(actionTarget);
        setElementValue("indexStep", indexStep);
        
        // Keine weitere Validierung der Eingabefelder: Formular abschicken
        return true;
    }
    else if (pathname.indexOf('/question.php') >= 0) {
        // question.php --------------------------------------------------------
        setActionTarget(actionTarget);
        setElementValue("indexStep", indexStep);

        // Keine weitere Validierung der Antworten: Formular abschicken
        return true;
    }
    else if (pathname.indexOf('/report.php') >= 0) {
        // report.php ----------------------------------------------------------
        
        /*
            report.php hat keine Formulardaten, also gibt es auch keine
            Validierung.

            Die einzige erlaubte Navigation: Neues Quiz starten ab index.php.
        */
        document.location = "/index.php";
        return true;
    }
    else {
        // Die aktuelle Seite ist nicht bekannt: Blockiere die weitere Submit-Aktion.
        return false; 
    }
}

function navigatePrevious() {
    let formElement = document.getElementById("quiz-form");
    formElement.setAttribute("onsubmit", "return navigate('previous');");
    // formElement.submit();
}

function getIndexStep(direction) {
    if (direction === 'next') return 1;
    else if (direction === 'previous') return -1;
    else return 0;
}

function getElementValue(fieldId, defaultValue) {
    let inputElement = document.getElementById(fieldId);

    if (inputElement) {
        // Verwende parseInt(), um den String-Wert in einen Integer zu verwandeln.
        return inputElement.value;
    }
    else {
        // In der aktuelle Seite fehlt das Feld: Default-Wert zurückgeben.
        return defaultValue;
    }
}

function setElementValue(fieldId, value) {
    let inputElement = document.getElementById(fieldId);
    if (inputElement) inputElement.value = value;
}

function setActionTarget(url) {
    let formElement = document.getElementById("quiz-form");
    formElement.action = url;
}

// FORM VALIDATION -------------------------------------------------------------

function validateStartParameter() {
    // TODO
    return true;
}

function validateAnswerSelection() {
    // TODO
    return true;   
}