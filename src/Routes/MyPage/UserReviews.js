import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from 'reactstrap';
import ReactStars from 'react-rating-stars-component';
import { AiFillDelete, AiFillEdit, GiCancel } from 'react-icons/all';
import { deleteReviewApi, editReviewApi, getReviewByUserIDApi } from '../../api';
import { Link } from 'react-router-dom';

const UserReviews = () => {
  let pageCount = 0;
  const [editTargetReview, setEditTargetReview] = useState({
    reviewId: -1,
    reviewDescription: null,
    reviewRating: 0,
  });
  const [userReviews, setUserReviews] = useState({
    data: null,
    pageSize: 5,
    currentPage: 1,
  });
  const [userReviewsLoading, setUserReviewsLoading] = useState(true);

  const getReviews = async () => {
    setUserReviewsLoading(true);
    await getReviewByUserIDApi.getReviews().then(res => {
      console.log(res.data);
      setUserReviews({ ...userReviews, data: res.data });
      setUserReviewsLoading(false);
    }).catch(e => {
      console.log('리뷰 정보 에러', e.response);
    });
  };

  const onClickPostEditReview = (targetReview) => {
    console.log(targetReview);
    if (targetReview.reviewRating === 0) {
      alert('별점을 입력해주세요');
    } else if (targetReview.reviewDescription === undefined || targetReview.reviewDescription === null || targetReview.reviewDescription.length === 0) {
      alert('후기 내용을 작성해주세요');
    } else if (targetReview.reviewDescription.length >= 500) {
      alert('500자 이하로 작성해주세요.');
    } else {
      editReviewApi.editReview(editTargetReview).then(async () => {
        console.log(userReviews.data);
        setUserReviews({
          ...userReviews, data:
            userReviews.data.map(review =>
              review.reviewId === targetReview.reviewId ? (
                  {
                    ...review,
                    reviewDescription: targetReview.reviewDescription,
                    reviewRating: targetReview.reviewRating,
                  }
                )
                : review,
            ),
        });
        setEditTargetReview({
          reviewId: -1,
          reviewDescription: null,
          reviewRating: 0,
        });
        alert('리뷰가 수정되었습니다.');
      }).catch(e => {
        console.log('리뷰 수정 에러', e);
      });
    }

  };

  const editRatingChanged = (newRating) => {
    setEditTargetReview({
      ...editTargetReview,
      reviewRating: newRating,
    });
  };

  const onChangeEditReview = (e) => {
    setEditTargetReview({
      ...editTargetReview,
      reviewDescription: e.target.value,
    });
  };

  const onChangeEditCancel = () => {
    setEditTargetReview({
      reviewId: -1,
      reviewDescription: null,
      reviewRating: 0,
    });
  };

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    try {
      pageCount = Math.ceil(userReviews.data.length / userReviews.pageSize);
      console.log(pageCount);
    } catch (e) {
      console.log(e);
    }
  }, [userReviews.data]);

  const drawStar = (rating) => {
    switch (rating) {
      case 5:
        return '★★★★★';
      case 4:
        return '★★★★☆';
      case 3:
        return '★★★☆☆';
      case 2:
        return '★★☆☆☆';
      case 1:
        return '★☆☆☆☆';

    }
  };

  const onClickEditReview = (review) => {
    setEditTargetReview({
      reviewId: -1,
      reviewDescription: null,
      reviewRating: 0,
    });
    setEditTargetReview({
      ...editTargetReview,
      reviewId: review.reviewId,
      reviewDescription: review.reviewDescription,
    });
    console.log(editTargetReview);
  };

  const onClickDeleteReview = (review) => {
    console.log(review);
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      deleteReviewApi.deleteReview(review).then(async () => {
          alert('리뷰 삭제');
          window.location.reload(true);
        },
      ).catch(e => {
        console.log(e.response);
      });
    } else {
    }
  };


  if (userReviewsLoading) return null;
  return (
    <div className={'userReviewsTable'}>
      <Table className='reviewTable'>
        <thead>
        <tr>
          <th width={'10%'}>별점</th>
          <th width={'15%'}>제품명</th>
          <th width={'25%'}>내용</th>
          <th width={'15%'}>작성일</th>
          <th width={'10%'}>좋아요</th>
          <th width={'10%'} />
        </tr>
        </thead>
        <tbody>

        {userReviews.data.map((review, index) => (
          review.reviewId === editTargetReview.reviewId ? (
            <tr key={index}>
              <td colSpan={1}>
                <ReactStars
                  classNames={'starRating'}
                  count={5}
                  onChange={editRatingChanged}
                  size={12}
                  activeColor='#fe9b5a'
                  isHalf={false}
                  edit={true} />
              </td>
              <td colSpan={4}>
                <Input type='textarea' name='text' classname='reviewFrom' rows='4'
                       value={editTargetReview.reviewDescription}
                       onChange={(e) => onChangeEditReview(e)}
                />
              </td>
              <td colSpan={1}>
                <Button className={'editButton'}
                        onClick={() => onClickPostEditReview(editTargetReview)}>
                  <AiFillEdit />
                </Button>
                <Button className={'editCancelButton'}
                        onClick={() => onChangeEditCancel()}>
                  <GiCancel />
                </Button>
              </td>
            </tr>


          ) : (
            <tr key={index}>
              <td style={{ color: '#fe9b5a', fontSize: '1.1em' }}>
                {drawStar(review.reviewRating)}
              </td>
              <td>
                <Link to={{
                  pathname: `searchProduct/food/${review.foodId}`,
                }} target='_blank'>
                  {review.foodName}
                </Link>
              </td>
              <td align={'left'}>
                {review.reviewDescription}
              </td>
              <td>
                {review.reviewCreatedDate.split('T')[0]}
              </td>
              <td>
                {review.likeCount}
              </td>
              <td>

                <Button className={'editButton'}
                        onClick={() => onClickEditReview(review)}>
                  <AiFillEdit />
                </Button>

                <Button className={'deleteButton'}
                        onClick={() => onClickDeleteReview(review)}>
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          )
        ))}

        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(UserReviews);