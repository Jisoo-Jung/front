document.addEventListener("DOMContentLoaded", () => {
    const filterOptions = document.querySelectorAll(".sort-filter-option");

    filterOptions.forEach((option) => {
        option.addEventListener("click", function () {
            // 이전에 선택된 필터 옵션에서 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            this.classList.add("selected");
        });
    });

    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const answerCategory = document.getElementById("answerCategory");
    let currentEditRow = null;

    // 임시 문의 데이터
    const inquiryData = {
        content: "이것은 문의 내용입니다. 여기에 문의 내용이 표시됩니다.",
        attachments: [
            {
                type: "image",
                src: "https://via.placeholder.com/150",
                name: "example-image-1.jpg",
            },
            {
                type: "image",
                src: "https://via.placeholder.com/200",
                name: "example-image-2.jpg",
            },
            {
                type: "video",
                src: "https://www.w3schools.com/html/mov_bbb.mp4",
                name: "example-video.mp4",
            },
            {
                type: "file",
                src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                name: "example-document.pdf",
            },
        ],
        answer: "",
    };

    // 첨부파일을 렌더링하는 함수
    function renderAttachments(attachments) {
        const attachmentContainer = document.getElementById(
            "attachmentContainer"
        );
        attachmentContainer.innerHTML = ""; // 기존 첨부파일 초기화

        attachments.forEach((attachment) => {
            const attachmentDiv = document.createElement("div");
            attachmentDiv.classList.add("attachmentWrapper");

            let element;
            if (attachment.type === "image") {
                element = document.createElement("img");
                element.src = attachment.src;
                element.alt = attachment.name;
                element.style.width = "100px"; // 이미지 크기 조절
            } else if (attachment.type === "video") {
                element = document.createElement("video");
                element.src = attachment.src;
                element.controls = true;
                element.style.width = "200px"; // 비디오 크기 조절
            } else if (attachment.type === "file") {
                element = document.createElement("a");
                element.href = attachment.src;
                element.textContent = attachment.name;
                element.target = "_blank";
            }

            attachmentDiv.appendChild(element);
            attachmentContainer.appendChild(attachmentDiv);
        });
    }

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // HTML의 문의 유형 및 제목을 가져와 모달에 표시
        const inquiryType = row
            .querySelector(".inquiry_kind")
            .textContent.trim();
        const inquiryTitle = row
            .querySelector(".inquiry_title")
            .textContent.trim();

        document.getElementById("inquiryType").value = inquiryType;
        document.getElementById("inquiryTitle").value = inquiryTitle;

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("inquiryContent").value = inquiryData.content;
        document.getElementById("answerContent").value = inquiryData.answer;

        // 첨부파일 렌더링
        renderAttachments(inquiryData.attachments);

        editModal.style.display = "block";
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
    }

    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            closeModal();
        }
    });

    // 답변 카테고리 선택 시 자동으로 답변 내용 채우기
    answerCategory.addEventListener("change", function () {
        const selectedAnswer = this.value;
        if (selectedAnswer) {
            document.getElementById("answerContent").value = selectedAnswer;
        }
    });

    // 수정 버튼 클릭 시 모달 열기
    function addEditButtonListeners() {
        document.querySelectorAll(".editBtn button").forEach((button) => {
            button.addEventListener("click", function () {
                const row = this.closest(".ServiceTable_row");
                openModal(row);
            });
        });
    }

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        inquiryData.answer = document.getElementById("answerContent").value;

        // 실제로는 서버에 저장하는 코드가 여기 들어가야 합니다.

        alert("답변이 저장되었습니다.");
        closeModal();
    });
});
